import os
import sys
import json
import re
import time
import http.client
import urllib.request
import subprocess
import imageio_ffmpeg

sys.stdout.reconfigure(line_buffering=True)

LIBRARY_ID = "815825"
API_KEY = "c38f0c59-0f49-4066-af5d440d17ad-1943-4d4e"
CAMPUS_TS_PATH = r"c:\Santi\Proyectos\flor-martinez\ecosystem\apps\academy\src\data\campus.ts"
MAPPING_OUT_PATH = r"c:\Santi\Proyectos\flor-martinez\ecosystem\apps\academy\src\data\bunnyVideos.json"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

TASKS = [
    {
        "file_name": "EBL-1-2.mp4",
        "src_path": r"C:\Santi\Flor Martinez\EBL Final\EBL-1-2.mp4",
        "lesson_id": "ebl-1-2",
        "local_dst": r"c:\Santi\Proyectos\flor-martinez\ecosystem\apps\academy\public\videos\ebl-1-2.mp4",
        "thumb_path": r"C:\Santi\Flor Martinez\thumbnails_flor\EBL-1-2.mp4.jpg",
    },
    {
        "file_name": "EBL-E1-8.mp4",
        "src_path": r"C:\Santi\Flor Martinez\EBL Final\EBL-E1-8.mp4",
        "lesson_id": "ebl-e1-8",
        "local_dst": r"c:\Santi\Proyectos\flor-martinez\ecosystem\apps\academy\public\videos\ebl-e1-8.mp4",
        "thumb_path": r"C:\Santi\Flor Martinez\thumbnails_flor\EBL-E1-8.mp4.jpg",
    }
]

def upload_chunked(library_id: str, video_guid: str, api_key: str, file_path: str, max_retries: int = 3):
    file_size = os.path.getsize(file_path)
    file_size_mb = file_size / (1024 * 1024)
    chunk_size = 2 * 1024 * 1024  # 2 MB chunks

    for attempt in range(1, max_retries + 1):
        try:
            conn = http.client.HTTPSConnection("video.bunnycdn.com", timeout=300)
            conn.putrequest("PUT", f"/library/{library_id}/videos/{video_guid}")
            conn.putheader("AccessKey", api_key)
            conn.putheader("Content-Type", "application/octet-stream")
            conn.putheader("Content-Length", str(file_size))
            conn.endheaders()

            uploaded = 0
            last_reported_pct = -1

            with open(file_path, "rb") as f:
                while True:
                    chunk = f.read(chunk_size)
                    if not chunk:
                        break
                    conn.send(chunk)
                    uploaded += len(chunk)
                    pct = int((uploaded / file_size) * 100)
                    if pct % 10 == 0 and pct != last_reported_pct:
                        print(f"   Progreso subida: {pct}% ({uploaded / (1024 * 1024):.1f}/{file_size_mb:.1f} MB)")
                        last_reported_pct = pct

            resp = conn.getresponse()
            resp.read()
            conn.close()

            if resp.status in (200, 201):
                return True
            else:
                print(f"   Status Bunny PUT: {resp.status}")
        except Exception as e:
            print(f"   [Reintento {attempt}/{max_retries}] Error en transferencia: {e}")
            time.sleep(3)

    return False

def process_video(task, mapping, campus_content):
    file_name = task["file_name"]
    src_file = task["src_path"]
    lesson_id = task["lesson_id"]
    local_dst = task["local_dst"]
    thumb_path = task["thumb_path"]

    print(f"\n=======================================================")
    print(f"PROCESANDO: {file_name} ({lesson_id})")
    print(f"=======================================================")

    if not os.path.exists(src_file):
        print(f"ERROR: No se encontró el archivo origen {src_file}")
        return mapping, campus_content

    old_data = mapping.get(file_name)
    old_guid = old_data.get("guid") if old_data else None

    # 1. Eliminar video viejo si existe
    if old_guid:
        print(f"1. Eliminando versión anterior en Bunny (GUID: {old_guid})...")
        del_url = f"https://video.bunnycdn.com/library/{LIBRARY_ID}/videos/{old_guid}"
        req_del = urllib.request.Request(del_url, headers={"AccessKey": API_KEY}, method="DELETE")
        try:
            with urllib.request.urlopen(req_del) as resp:
                pass
            print("   ✓ Video anterior eliminado de Bunny.")
        except Exception as e:
            print(f"   Nota al eliminar video viejo: {e}")

    # 2. Crear nuevo video en Bunny
    file_size_mb = os.path.getsize(src_file) / (1024 * 1024)
    print(f"2. Creando nuevo registro en Bunny para {file_name} ({file_size_mb:.1f} MB)...")
    create_url = f"https://video.bunnycdn.com/library/{LIBRARY_ID}/videos"
    create_data = json.dumps({"title": file_name}).encode("utf-8")
    req_create = urllib.request.Request(
        create_url,
        data=create_data,
        headers={"AccessKey": API_KEY, "Content-Type": "application/json", "Accept": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(req_create) as resp:
        res_json = json.loads(resp.read().decode("utf-8"))
        new_guid = res_json["guid"]
        print(f"   ✓ Video creado con nuevo GUID: {new_guid}")

    # 3. Subir archivo binario
    print(f"3. Subiendo archivo a Bunny CDN...")
    ok = upload_chunked(LIBRARY_ID, new_guid, API_KEY, src_file)
    if not ok:
        print(f"ERROR: Falló la subida de {file_name} a Bunny.")
        return mapping, campus_content
    print("   ✓ Archivo subido exitosamente a Bunny CDN!")

    embed_url = f"https://iframe.mediadelivery.net/embed/{LIBRARY_ID}/{new_guid}?autoplay=false&loop=false&muted=false&preload=true&responsive=true"

    # 4. Subir miniatura oficial
    if os.path.exists(thumb_path):
        print("4. Subiendo miniatura oficial a Bunny...")
        try:
            with open(thumb_path, "rb") as tf:
                tbytes = tf.read()
            th_url = f"https://video.bunnycdn.com/library/{LIBRARY_ID}/videos/{new_guid}/thumbnail"
            req_th = urllib.request.Request(
                th_url,
                data=tbytes,
                headers={"AccessKey": API_KEY, "Content-Type": "application/octet-stream"},
                method="POST"
            )
            with urllib.request.urlopen(req_th, timeout=30) as tresp:
                if tresp.status == 200:
                    print("   ✓ Miniatura configurada con éxito en Bunny!")
        except Exception as te:
            print(f"   Nota al subir miniatura: {te}")

    # 5. Actualizar mapping dict
    mapping[file_name] = {
        "guid": new_guid,
        "embed_url": embed_url,
        "id": lesson_id,
        "ts_key": f"/videos/{lesson_id}.mp4"
    }

    # 6. Actualizar campus.ts
    if old_data and old_data.get("embed_url"):
        campus_content = campus_content.replace(old_data["embed_url"], embed_url)
    else:
        campus_content = re.sub(
            rf"(id:\s*'{lesson_id}'[\s\S]*?videoUrl:\s*')[^']*",
            rf"\g<1>{embed_url}",
            campus_content
        )
    print(f"   ✓ campus.ts actualizado con nueva URL para {lesson_id}.")

    # 7. Optimizar copia local
    print(f"7. Generando copia local optimizada para {local_dst}...")
    cmd = [
        FFMPEG, "-y", "-i", src_file,
        "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "22",
        "-c:a", "aac", "-b:a", "192k",
        "-movflags", "+faststart",
        local_dst
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode == 0:
        print(f"   ✓ Archivo local {os.path.basename(local_dst)} optimizado.")
    else:
        print("   Nota ffmpeg local:", res.stderr.decode("utf-8", errors="ignore")[-200:])

    return mapping, campus_content

def main():
    with open(MAPPING_OUT_PATH, "r", encoding="utf-8") as f:
        mapping = json.load(f)

    with open(CAMPUS_TS_PATH, "r", encoding="utf-8") as f:
        campus_content = f.read()

    for task in TASKS:
        mapping, campus_content = process_video(task, mapping, campus_content)

    with open(MAPPING_OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(mapping, f, indent=2)
    print("\n✓ bunnyVideos.json guardado.")

    with open(CAMPUS_TS_PATH, "w", encoding="utf-8") as f:
        f.write(campus_content)
    print("✓ campus.ts guardado.")

    print("\n=== ¡CLASE 1-2 Y CLASE E1-8 ACTUALIZADAS Y SUBIDAS EXITOSAMENTE! ===")

if __name__ == "__main__":
    main()
