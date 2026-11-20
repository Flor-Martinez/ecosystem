import os
import sys
import json
import re
import time
import http.client
import urllib.request

sys.stdout.reconfigure(line_buffering=True)

LIBRARY_ID = "815825"
API_KEY = "c38f0c59-0f49-4066-af5d440d17ad-1943-4d4e"
SRC_DIR = r"C:\Santi\Flor Martinez\EBL Final"
CAMPUS_TS_PATH = r"c:\Santi\Proyectos\flor-martinez\ecosystem\apps\academy\src\data\campus.ts"
MAPPING_OUT_PATH = r"c:\Santi\Proyectos\flor-martinez\ecosystem\apps\academy\src\data\bunnyVideos.json"

MOD3_JOBS = [
    {"file": "EBL-3-1.mp4", "id": "ebl-3-1", "ts_key": "/videos/ebl-3-1.mp4"},
    {"file": "EBL-3-2.mp4", "id": "ebl-3-2", "ts_key": "/videos/ebl-3-2.mp4"},
    {"file": "EBL-3-3.mp4", "id": "ebl-3-3", "ts_key": "/videos/ebl-3-3.mp4"},
    {"file": "EBL-3-4.mp4", "id": "ebl-3-4", "ts_key": "/videos/ebl-3-4.mp4"},
]

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
                    if pct % 25 == 0 and pct != last_reported_pct:
                        print(f"   Progreso: {pct}% ({uploaded / (1024 * 1024):.1f}/{file_size_mb:.1f} MB)")
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

def reupload_module_3():
    with open(MAPPING_OUT_PATH, "r", encoding="utf-8") as f:
        mapping = json.load(f)

    with open(CAMPUS_TS_PATH, "r", encoding="utf-8") as f:
        campus_content = f.read()

    print("=== RE-SUBIDA DE MÓDULO 3 CON AUDIO NORMALIZADO ===")
    for idx, j in enumerate(MOD3_JOBS, start=1):
        file_name = j["file"]
        file_path = os.path.join(SRC_DIR, file_name)
        file_size_mb = os.path.getsize(file_path) / (1024 * 1024)

        # 1. Borrar video viejo de Bunny si existe en mapping
        old_data = mapping.get(file_name)
        if old_data and old_data.get("guid"):
            old_guid = old_data["guid"]
            print(f"[{idx}/4] Eliminando versión previa con audio bajo de Bunny: {old_guid}")
            del_url = f"https://video.bunnycdn.com/library/{LIBRARY_ID}/videos/{old_guid}"
            req_del = urllib.request.Request(del_url, headers={"AccessKey": API_KEY}, method="DELETE")
            try:
                with urllib.request.urlopen(req_del) as resp:
                    pass
            except Exception as e:
                print(f"Nota: No se pudo eliminar previo {old_guid}: {e}")

        # 2. Crear nuevo objeto en Bunny
        print(f"[{idx}/4] Creando nuevo video en Bunny para {file_name} ({file_size_mb:.1f} MB)...")
        create_url = f"https://video.bunnycdn.com/library/{LIBRARY_ID}/videos"
        create_data = json.dumps({"title": file_name}).encode("utf-8")
        req_create = urllib.request.Request(
            create_url,
            data=create_data,
            headers={"AccessKey": API_KEY, "Content-Type": "application/json", "Accept": "application/json"},
            method="POST"
        )
        with urllib.request.urlopen(req_create) as resp:
            new_guid = json.loads(resp.read().decode("utf-8"))["guid"]

        # 3. Subir archivo normalizado
        print(f"Transfiriendo archivo con audio normalizado (GUID: {new_guid})...")
        success = upload_chunked(LIBRARY_ID, new_guid, API_KEY, file_path)
        if not success:
            print(f"ERROR: Falló subida de {file_name}")
            continue

        embed_url = f"https://iframe.mediadelivery.net/embed/{LIBRARY_ID}/{new_guid}?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
        
        # 4. Actualizar campus.ts
        if old_data and old_data.get("embed_url"):
            old_embed = old_data["embed_url"]
            campus_content = campus_content.replace(old_embed, embed_url)
        else:
            ts_key = j["ts_key"]
            pattern = re.compile(rf"videoUrl:\s*['\"][^'\"]*{re.escape(ts_key)}[^'\"]*['\"]")
            campus_content = pattern.sub(f"videoUrl: '{embed_url}'", campus_content)

        # 5. Guardar en mapping
        mapping[file_name] = {
            "guid": new_guid,
            "embed_url": embed_url,
            "id": j["id"],
            "ts_key": j["ts_key"]
        }
        print(f"✓ {file_name} actualizado exitosamente!")

    with open(MAPPING_OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(mapping, f, indent=2)

    with open(CAMPUS_TS_PATH, "w", encoding="utf-8") as f:
        f.write(campus_content)

    print("\n=== MÓDULO 3 RE-SUBIDO Y CAMPUS ACTUALIZADO CON ÉXITO ===")

if __name__ == "__main__":
    reupload_module_3()
