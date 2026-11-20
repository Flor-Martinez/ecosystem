"""
Script de subida automatica a Bunny Stream para la Academia Flor Martinez.
Sube los 37 videos originales en maxima calidad (sin comprimir) desde
C:\\Santi\\Flor Martinez\\EBL Final directamente a Bunny Stream via API REST.
Utiliza unicamente librerias nativas de Python (urllib / http.client).
"""

import os
import sys
import json
import re
import urllib.request
import urllib.error

SRC_DIR = r"C:\Santi\Flor Martinez\EBL Final"
CAMPUS_TS_PATH = r"c:\Santi\Proyectos\flor-martinez\ecosystem\apps\academy\src\data\campus.ts"
MAPPING_OUT_PATH = r"c:\Santi\Proyectos\flor-martinez\ecosystem\apps\academy\src\data\bunnyVideos.json"

def get_job_mapping():
    return [
        {"file": "EBL-1-1.mp4", "id": "ebl-1-1", "ts_key": "/videos/ebl-1-1.mp4"},
        {"file": "EBL-1-2.mp4", "id": "ebl-1-2", "ts_key": "/videos/ebl-1-2.mp4"},
        {"file": "EBL-1-3.mp4", "id": "ebl-1-3", "ts_key": "/videos/ebl-1-3.mp4"},
        {"file": "EBL-1-4.mp4", "id": "ebl-1-4", "ts_key": "/videos/ebl-1-4.mp4"},
        {"file": "EBL-2-1.mp4", "id": "ebl-2-1", "ts_key": "/videos/ebl-2-1.mp4"},
        {"file": "EBL-2-2.mp4", "id": "ebl-2-2", "ts_key": "/videos/ebl-2-2.mp4"},
        {"file": "EBL-2-3.mp4", "id": "ebl-2-3", "ts_key": "/videos/ebl-2-3.mp4"},
        {"file": "EBL-3-1.mp4", "id": "ebl-3-1", "ts_key": "/videos/ebl-3-1.mp4"},
        {"file": "EBL-3-2.mp4", "id": "ebl-3-2", "ts_key": "/videos/ebl-3-2.mp4"},
        {"file": "EBL-3-3.mp4", "id": "ebl-3-3", "ts_key": "/videos/ebl-3-3.mp4"},
        {"file": "EBL-3-4.mp4", "id": "ebl-3-4", "ts_key": "/videos/ebl-3-4.mp4"},
        {"file": "EBL-4-1.mp4", "id": "ebl-4-1", "ts_key": "/videos/ebl-4-1.mp4"},
        {"file": "EBL-4-2.mp4", "id": "ebl-4-2", "ts_key": "/videos/ebl-4-2.mp4"},
        {"file": "EBL-4-3.mp4", "id": "ebl-4-3", "ts_key": "/videos/ebl-4-3.mp4"},
        {"file": "EBL-4-4.mp4", "id": "ebl-4-4", "ts_key": "/videos/ebl-4-4.mp4"},
        {"file": "EBL-4-5.mp4", "id": "ebl-4-5", "ts_key": "/videos/ebl-4-5.mp4"},
        {"file": "EBL-5-1.mp4", "id": "ebl-5-1", "ts_key": "/videos/ebl-5-1.mp4"},
        {"file": "EBL-5-2.mp4", "id": "ebl-5-2", "ts_key": "/videos/ebl-5-2.mp4"},
        {"file": "EBL-5-3.mp4", "id": "ebl-5-3", "ts_key": "/videos/ebl-5-3.mp4"},
        {"file": "EBL-6-1.mp4", "id": "ebl-6-1", "ts_key": "/videos/ebl-6-1.mp4"},
        {"file": "EBL-6-2.mp4", "id": "ebl-6-2", "ts_key": "/videos/ebl-6-2.mp4"},
        {"file": "EBL-6-3.mp4", "id": "ebl-6-3", "ts_key": "/videos/ebl-6-3.mp4"},
        {"file": "EBL-6-4.mp4", "id": "ebl-6-4", "ts_key": "/videos/ebl-6-4.mp4"},
        {"file": "EBL-6-5.mp4", "id": "ebl-6-5", "ts_key": "/videos/ebl-6-5.mp4"},
        {"file": "EBL-7-1.mp4", "id": "ebl-7-1", "ts_key": "/videos/ebl-7-1.mp4"},
        {"file": "EBL-7-2.mp4", "id": "ebl-7-2", "ts_key": "/videos/ebl-7-2.mp4"},
        {"file": "EBL-7-3.mp4", "id": "ebl-7-3", "ts_key": "/videos/ebl-7-3.mp4"},
        {"file": "EBL-7-4.mp4", "id": "ebl-7-4", "ts_key": "/videos/ebl-7-4.mp4"},
        {"file": "EBL-7-5.mp4", "id": "ebl-7-5", "ts_key": "/videos/ebl-7-5.mp4"},
        {"file": "EBL-E1-1.mp4", "id": "ebl-e1-1", "ts_key": "/videos/ebl-e1-1.mp4"},
        {"file": "EBL-E1-2.mp4", "id": "ebl-e1-2", "ts_key": "/videos/ebl-e1-2.mp4"},
        {"file": "EBL-E1-3.mp4", "id": "ebl-e1-3", "ts_key": "/videos/ebl-e1-3.mp4"},
        {"file": "EBL-E1-4.mp4", "id": "ebl-e1-4", "ts_key": "/videos/ebl-e1-4.mp4"},
        {"file": "EBL-E1-5.mp4", "id": "ebl-e1-5", "ts_key": "/videos/ebl-e1-5.mp4"},
        {"file": "EBL-E1-6.mp4", "id": "ebl-e1-6", "ts_key": "/videos/ebl-e1-6.mp4"},
        {"file": "EBL-E1-7.mp4", "id": "ebl-e1-7", "ts_key": "/videos/ebl-e1-7.mp4"},
        {"file": "EBL-E1-8.mp4", "id": "ebl-e1-8", "ts_key": "/videos/ebl-e1-8.mp4"},
    ]

def upload_all(library_id: str, api_key: str):
    jobs = get_job_mapping()
    results = {}

    if os.path.exists(MAPPING_OUT_PATH):
        try:
            with open(MAPPING_OUT_PATH, "r", encoding="utf-8") as f:
                results = json.load(f)
        except Exception:
            results = {}

    print(f"=== INICIANDO SUBIDA DE {len(jobs)} VIDEOS A BUNNY STREAM (Library {library_id}) ===")

    for idx, j in enumerate(jobs, start=1):
        file_name = j["file"]
        file_path = os.path.join(SRC_DIR, file_name)

        if not os.path.exists(file_path):
            print(f"[{idx}/{len(jobs)}] ERROR: No encontrado: {file_path}")
            continue

        file_size_mb = os.path.getsize(file_path) / (1024 * 1024)

        if file_name in results and results[file_name].get("guid"):
            print(f"[{idx}/{len(jobs)}] YA SUBIDO: {file_name} -> {results[file_name]['guid']}")
            continue

        print(f"\n[{idx}/{len(jobs)}] Creando objeto de video para {file_name} ({file_size_mb:.1f} MB)...")
        create_url = f"https://video.bunnycdn.com/library/{library_id}/videos"
        create_data = json.dumps({"title": file_name}).encode("utf-8")

        req = urllib.request.Request(
            create_url,
            data=create_data,
            headers={
                "AccessKey": api_key,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method="POST"
        )

        try:
            with urllib.request.urlopen(req) as resp:
                resp_text = resp.read().decode("utf-8")
                video_data = json.loads(resp_text)
                video_guid = video_data.get("guid")
        except urllib.error.HTTPError as e:
            print(f"ERROR creando video en Bunny: {e.code} - {e.read().decode('utf-8')}")
            continue

        print(f"Objeto creado. GUID: {video_guid}. Subiendo binario original ({file_size_mb:.1f} MB)...")

        upload_url = f"https://video.bunnycdn.com/library/{library_id}/videos/{video_guid}"
        with open(file_path, "rb") as f:
            file_data = f.read()

        up_req = urllib.request.Request(
            upload_url,
            data=file_data,
            headers={
                "AccessKey": api_key,
                "Content-Type": "application/octet-stream"
            },
            method="PUT"
        )

        try:
            with urllib.request.urlopen(up_req) as up_resp:
                embed_url = f"https://iframe.mediadelivery.net/embed/{library_id}/{video_guid}?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
                results[file_name] = {
                    "guid": video_guid,
                    "embed_url": embed_url,
                    "id": j["id"],
                    "ts_key": j["ts_key"]
                }
                print(f"✓ SUBIDA EXITOSA: {file_name} -> Embed: {embed_url}")

                with open(MAPPING_OUT_PATH, "w", encoding="utf-8") as out_f:
                    json.dump(results, out_f, indent=2)
        except urllib.error.HTTPError as e:
            print(f"ERROR subiendo video {file_name}: {e.code} - {e.read().decode('utf-8')}")

    print("\n=== TODAS LAS SUBIDAS COMPLETADAS ===")
    print(f"Actualizando {CAMPUS_TS_PATH}...")
    update_campus_ts(results)

def update_campus_ts(results):
    with open(CAMPUS_TS_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    replacements = 0
    for file_name, data in results.items():
        ts_key = data["ts_key"]
        embed_url = data["embed_url"]
        pattern = re.compile(rf"videoUrl:\s*['\"]{re.escape(ts_key)}(\?v=\d+)?['\"]")
        if pattern.search(content):
            content = pattern.sub(f"videoUrl: '{embed_url}'", content)
            replacements += 1

    with open(CAMPUS_TS_PATH, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Se actualizaron {replacements} enlaces de video en campus.ts con las URLs oficiales de streaming.")

if __name__ == "__main__":
    lib_id = os.environ.get("BUNNY_LIBRARY_ID") or (sys.argv[1] if len(sys.argv) > 1 else None)
    key = os.environ.get("BUNNY_API_KEY") or (sys.argv[2] if len(sys.argv) > 2 else None)

    if not lib_id or not key:
        print("Uso: python upload_to_bunny.py <LIBRARY_ID> <API_KEY>")
        sys.exit(1)

    upload_all(lib_id, key)
