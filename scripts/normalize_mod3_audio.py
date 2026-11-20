import os
import subprocess
import re
import shutil

ffmpeg = r"C:\Users\santi\AppData\Local\CapCut\Apps\9.6.0.4097\ffmpeg.exe"
src_dir = r"C:\Santi\Flor Martinez\EBL Final"
backup_dir = r"C:\Santi\Flor Martinez\EBL Final\_backup_original_audio"
os.makedirs(backup_dir, exist_ok=True)

mod3_files = ["EBL-3-1.mp4", "EBL-3-2.mp4", "EBL-3-3.mp4", "EBL-3-4.mp4"]

print("=== NORMALIZANDO AUDIO MÓDULO 3 (EBL-3-1 a 3-4) ===")
for f in mod3_files:
    in_path = os.path.join(src_dir, f)
    bak_path = os.path.join(backup_dir, f)
    if not os.path.exists(bak_path):
        shutil.copy2(in_path, bak_path)
        print(f"Respaldo creado: {bak_path}")
    
    tmp_path = os.path.join(src_dir, f"temp_{f}")
    cmd = [
        ffmpeg, "-y", "-i", bak_path,
        "-c:v", "copy",
        "-af", "loudnorm=I=-14.0:TP=-0.5:LRA=11",
        "-c:a", "aac", "-b:a", "192k",
        tmp_path
    ]
    subprocess.run(cmd, check=True)
    
    cmd_det = [ffmpeg, "-i", tmp_path, "-af", "volumedetect", "-vn", "-f", "null", "NUL"]
    res = subprocess.run(cmd_det, capture_output=True, text=True)
    m = re.search(r"mean_volume:\s*([-\d\.]+\s*dB)", res.stderr)
    x = re.search(r"max_volume:\s*([-\d\.]+\s*dB)", res.stderr)
    m_val = m.group(1) if m else "N/A"
    x_val = x.group(1) if x else "N/A"
    print(f"✓ {f} normalizado con éxito: mean={m_val}, max={x_val}")
    
    shutil.move(tmp_path, in_path)
    print(f"Archivo actualizado en disco: {in_path}\n")

print("=== MÓDULO 3 NORMALIZADO AL 100% ===")
