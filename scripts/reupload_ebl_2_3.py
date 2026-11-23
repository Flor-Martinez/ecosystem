import os
import sys
import json
import re
import time
import http.client
import urllib.request
import subprocess

sys.stdout.reconfigure(line_buffering=True)

LIBRARY_ID = "815825"
API_KEY = "c38f0c59-0f49-4066-af5d440d17ad-1943-4d4e"
SRC_FILE = r"C:\Santi\Flor Martinez\EBL Final\EBL-2-3.mp4"
CAMPUS_TS_PATH = r"c:\Santi\Proyectos\flor-martinez\ecosystem\apps\academy\src\data\campus.ts"
MAPPING_OUT_PATH = r"c:\Santi\Proyectos\flor-martinez\ecosystem\apps\academy\src\data\bunnyVideos.json"
LOCAL_DST = r"c:\Santi\Proyectos\flor-martinez\ecosystem\apps\academy\public\videos\ebl-2-3.mp4"
FFMPEG = r"C:\Users\santi\AppData\Local\CapCut\Apps\9.6.0.4097\ffmpeg.exe"

def upload_chunked(library_id: str, video_guid: str, api_key: str, file_path: str, max_retries: int = 3):
    file_size = os.path.getsize(file_path)
    file_size_mb = file_size / (1024 * 1024)
    chunk_size = 1024 * 1024  # 1 MB

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
                    if pct % 20 == 0 and pct != last_reported_pct:
                        print(f"   Progreso subida: {pct}% ({uploaded / (1024 * 1024):.1f}/{file_size_mb:.1f} MB)")
                        last_reported_pct = pct

            resp = conn.getresponse()
            resp.read()
            conn.close()

            if resp.status in (200, 201):
                return True
        except Exception as e:
            print(f"   [Reintento {attempt}/{max_retries}] Error en transferencia: {e}")
            time.sleep(3)

    return False

def main():
    print(f"=== SUBIENDO NUEVA VERSIÓN DE EBL-2-3.mp4 CON OFF A BUNNY STREAM ===")
    if not os.path.exists(SRC_FILE):
        print(f"ERROR: No se encontró el archivo {SRC_FILE}")
        return

    with open(MAPPING_OUT_PATH, "r", encoding="utf-8") as f:
        mapping = json.load(f)

    with open(CAMPUS_TS_PATH, "r", encoding="utf-8") as f:
        campus_content = f.read()

    file_name = "EBL-2-3.mp4"
    old_data = mapping.get(file_name)
    old_guid = old_data.get("guid") if old_data else None

    # 1. Eliminar video anterior de Bunny
    if old_guid:
        print(f"1. Eliminando versión anterior de Bunny (GUID: {old_guid})...")
        del_url = f"https://video.bunnycdn.com/library/{LIBRARY_ID}/videos/{old_guid}"
        req_del = urllib.request.Request(del_url, headers={"AccessKey": API_KEY}, method="DELETE")
        try:
            with urllib.request.urlopen(req_del) as resp:
                pass
            print("   ✓ Video anterior eliminado de Bunny.")
        except Exception as e:
            print(f"   Nota al eliminar video viejo: {e}")

    # 2. Crear nuevo video en Bunny
    file_size_mb = os.path.getsize(SRC_FILE) / (1024 * 1024)
    print(f"2. Creando nuevo registro de video en Bunny ({file_size_mb:.1f} MB)...")
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
        print(f"   ✓ Video creado con GUID: {new_guid}")

    # 3. Subir archivo
    print(f"3. Transfiriendo archivo con el off integrado...")
    ok = upload_chunked(LIBRARY_ID, new_guid, API_KEY, SRC_FILE)
    if not ok:
        print("ERROR: Falló la subida a Bunny.")
        return
    print("   ✓ Archivo transferido a Bunny CDN exitosamente!")

    embed_url = f"https://iframe.mediadelivery.net/embed/{LIBRARY_ID}/{new_guid}?autoplay=false&loop=false&muted=false&preload=true&responsive=true"

    # 4. Subir miniatura a Bunny
    thumb_path = os.path.join(r"C:\Santi\Flor Martinez\thumbnails_flor", f"{file_name}.jpg")
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

    # 5. Actualizar mapping
    mapping[file_name] = {
        "guid": new_guid,
        "embed_url": embed_url,
        "id": "ebl-2-3",
        "ts_key": "/videos/ebl-2-3.mp4"
    }
    with open(MAPPING_OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(mapping, f, indent=2)
    print("5. bunnyVideos.json actualizado.")

    # 6. Actualizar campus.ts
    if old_data and old_data.get("embed_url"):
        campus_content = campus_content.replace(old_data["embed_url"], embed_url)
    else:
        pattern = re.compile(r"id:\s*'ebl-2-3'[\s\S]*?videoUrl:\s*'[^']*'")
        # direct replace if known
        campus_content = re.sub(
            r"(id:\s*'ebl-2-3'[\s\S]*?videoUrl:\s*')[^']*",
            rf"\g<1>{embed_url}",
            campus_content
        )

    with open(CAMPUS_TS_PATH, "w", encoding="utf-8") as f:
        f.write(campus_content)
    print("6. campus.ts sincronizado con la nueva URL de Bunny.")

    # 7. Actualizar versión local procesada con ffmpeg
    if os.path.exists(FFMPEG):
        print("7. Generando copia local optimizada para apps/academy/public/videos/ebl-2-3.mp4...")
        cmd = [
            FFMPEG, "-y", "-i", SRC_FILE,
            "-vf", "format=yuv420p",
            "-c:v", "h264_mf", "-b:v", "3800k",
            "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
            "-c:a", "copy", "-movflags", "+faststart",
            LOCAL_DST
        ]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode == 0:
            print("   ✓ Archivo local ebl-2-3.mp4 optimizado.")
        else:
            print("   Nota ffmpeg local:", res.stderr.decode("utf-8", errors="ignore")[-200:])

    print("\n=== ¡EBL-2-3 SUBIDO Y ACTUALIZADO EN BUNNY STREAM Y CAMPUS EXITOSAMENTE! ===")

if __name__ == "__main__":
    main()
