import os
import sys
import json
import subprocess
import re
import urllib.request

sys.stdout.reconfigure(line_buffering=True)

FFMPEG = r"C:\Users\santi\AppData\Local\CapCut\Apps\9.6.0.4097\ffmpeg.exe"
SRC_DIR = r"C:\Santi\Flor Martinez\EBL Final"
THUMBS_DIR = r"C:\Santi\Flor Martinez\thumbnails_flor"
MAPPING_PATH = r"c:\Santi\Proyectos\flor-martinez\ecosystem\apps\academy\src\data\bunnyVideos.json"

LIBRARY_ID = "815825"
API_KEY = "c38f0c59-0f49-4066-af5d440d17ad-1943-4d4e"

os.makedirs(THUMBS_DIR, exist_ok=True)

def get_video_duration(path):
    res = subprocess.run([FFMPEG, "-i", path], capture_output=True, text=True)
    m = re.search(r"Duration:\s*(\d+):(\d+):([\d\.]+)", res.stderr)
    if m:
        return int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))
    return 100.0

def extract_best_candidate(video_file):
    in_path = os.path.join(SRC_DIR, video_file)
    if not os.path.exists(in_path):
        return None

    dur = get_video_duration(in_path)
    
    # Probamos momentos estratégicos:
    # 1. Al final de la clase (donde Flor cierra sonriendo y en silencio justo antes del outro)
    # 2. Al principio (segundos 7 a 9 donde Flor saluda a cámara)
    candidates = [
        dur - 6.0,
        dur - 7.0,
        dur - 8.0,
        dur - 9.0,
        7.5,
        8.2,
        8.5,
        6.8,
        7.0
    ]

    best_file = None
    lowest_vol = 999.0
    
    # Extraemos frames y medimos volumen de audio en ese instante (menos volumen = boca cerrada / silencio)
    for t in candidates:
        if t <= 0 or t >= dur:
            continue
        out_jpg = os.path.join(THUMBS_DIR, f"candidate_{video_file}_{t:.1f}.jpg")
        cmd_frame = [FFMPEG, "-y", "-ss", str(t), "-i", in_path, "-vframes", "1", "-q:v", "2", out_jpg]
        subprocess.run(cmd_frame, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        if not os.path.exists(out_jpg) or os.path.getsize(out_jpg) < 15000:
            continue

        # Verificar que no sea la placa blanca de título (medir brillo de esquina)
        from PIL import Image
        try:
            with Image.open(out_jpg) as im:
                # La placa de título es casi totalmente blanca (R>245, G>245, B>245)
                corner = im.crop((50, 50, 150, 150)).convert("L")
                import numpy as np
                mean_brightness = float(np.mean(corner))
                if mean_brightness > 250:
                    continue  # Es la placa blanca, saltar
        except Exception:
            pass
            
        # Detectar volumen en ventana de 0.25s
        cmd_vol = [FFMPEG, "-ss", str(max(0, t - 0.1)), "-t", "0.25", "-i", in_path, "-af", "volumedetect", "-f", "null", "NUL"]
        res_vol = subprocess.run(cmd_vol, capture_output=True, text=True)
        m = re.search(r"mean_volume:\s*([-\d\.]+)", res_vol.stderr)
        vol = float(m.group(1)) if m else -20.0
        
        # Más bajo en dB = mayor silencio = boca cerrada
        if best_file is None or vol < lowest_vol:
            lowest_vol = vol
            best_file = out_jpg

    final_thumb = os.path.join(THUMBS_DIR, f"{video_file}.jpg")
    if best_file and os.path.exists(best_file):
        import shutil
        shutil.copy2(best_file, final_thumb)
        return final_thumb
    return None

def upload_thumbnail_to_bunny(guid, image_path):
    with open(image_path, "rb") as f:
        img_bytes = f.read()

    url = f"https://video.bunnycdn.com/library/{LIBRARY_ID}/videos/{guid}/thumbnail"
    req = urllib.request.Request(
        url,
        data=img_bytes,
        headers={
            "AccessKey": API_KEY,
            "Content-Type": "application/octet-stream"
        },
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.status == 200

def process_all():
    with open(MAPPING_PATH, "r", encoding="utf-8") as f:
        mapping = json.load(f)

    print(f"=== GENERANDO Y APLICANDO MINIATURAS CON FLOR PARA {len(mapping)} CLASES ===")
    
    for idx, (video_file, data) in enumerate(mapping.items(), start=1):
        guid = data["guid"]
        print(f"\n[{idx}/{len(mapping)}] Procesando {video_file}...")
        thumb_path = extract_best_candidate(video_file)
        if not thumb_path:
            print(f"  ✗ No se pudo extraer miniatura para {video_file}")
            continue

        print(f"  ✓ Fotograma seleccionado ({os.path.getsize(thumb_path) // 1024} KB). Subiendo a Bunny...")
        try:
            ok = upload_thumbnail_to_bunny(guid, thumb_path)
            if ok:
                print(f"  ✓ Miniatura actualizada con éxito en Bunny!")
            else:
                print(f"  ✗ Bunny respondió con error")
        except Exception as e:
            print(f"  ✗ Error al subir miniatura: {e}")

    print("\n=== TODAS LAS MINIATURAS CON FLOR FUERON APLICADAS EN BUNNY ===")

if __name__ == "__main__":
    process_all()
