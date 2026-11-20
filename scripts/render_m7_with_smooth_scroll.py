import os
import shutil
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

brand_dir = "apps/academy/public/brand"
font_bold = os.path.join(brand_dir, "PlusJakartaSans-Bold.ttf")
font_extrabold = os.path.join(brand_dir, "PlusJakartaSans-ExtraBold.ttf")
font_semibold = os.path.join(brand_dir, "PlusJakartaSans-SemiBold.ttf")

logo_raw_path = os.path.join(brand_dir, "flor_martinez_academia_transparente_color.png")
raw_logo = Image.open(logo_raw_path).convert("RGBA")
clean_logo = raw_logo.crop(raw_logo.getbbox())

def get_font(path, size):
    return ImageFont.truetype(path, size)

w, h = 1920, 1080
fps = 30
duration_sec = 6.0  # Exactamente 6.0 segundos (180 frames) para calce 1:1 en CapCut
total_frames = int(fps * duration_sec)
x_left = 180

def create_graduation_cap_icon(size=38):
    scale = 4
    s = size * scale
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([0, 0, s, s], radius=int(9 * scale), fill=(124, 58, 237, 255))
    cx, cy = s / 2, s * 0.38
    hw, hh = s * 0.36, s * 0.16
    diamond = [(cx, cy - hh), (cx + hw, cy), (cx, cy + hh), (cx - hw, cy)]
    draw.line([diamond[0], diamond[1], diamond[2], diamond[3], diamond[0]], fill=(255, 255, 255, 255), width=int(2.4 * scale))
    arch_top = cy + s * 0.04
    arch_bot = cy + s * 0.28
    arch_hw = hw * 0.65
    draw.arc([cx - arch_hw, arch_top, cx + arch_hw, arch_bot], start=0, end=180, fill=(255, 255, 255, 255), width=int(2.4 * scale))
    tassel_x = cx + hw * 0.82
    draw.line([(cx, cy), (tassel_x, cy + s * 0.1)], fill=(255, 255, 255, 255), width=int(1.8 * scale))
    draw.line([(tassel_x, cy + s * 0.1), (tassel_x, cy + s * 0.32)], fill=(255, 255, 255, 255), width=int(2.2 * scale))
    draw.ellipse([tassel_x - 3*scale, cy + s*0.30, tassel_x + 3*scale, cy + s*0.36], fill=(255, 255, 255, 255))
    return img.resize((size, size), Image.Resampling.LANCZOS)

grad_icon = create_graduation_cap_icon(38)

# Barra lateral violeta
stripe_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
ImageDraw.Draw(stripe_layer).rectangle([0, 0, 14, h], fill=(124, 58, 237, 255))

# Bloque Bottom Flor Martínez
bot_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
d_bot = ImageDraw.Draw(bot_layer)
y_bot = 770
bot_layer.paste(grad_icon, (x_left, y_bot + 2), grad_icon)

f_course = get_font(font_bold, 34)
course_str = "Experiencia Búsqueda Laboral"
d_bot.text((x_left + 52, y_bot), course_str, font=f_course, fill=(15, 23, 42, 255))
course_w = int(d_bot.textlength(course_str, font=f_course)) + 52

d_bot.text((x_left, y_bot + 56), "por", font=get_font(font_semibold, 26), fill=(100, 116, 139, 255))

lw = course_w
lh = int(clean_logo.height * (lw / clean_logo.width))
resized_logo = clean_logo.resize((lw, lh), Image.Resampling.LANCZOS)
bot_layer.paste(resized_logo, (x_left, y_bot + 104), resized_logo)

def build_mod_layer_m7():
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    y_start = 280
    pill_w = 260
    pill_h = 58
    d.rounded_rectangle([x_left, y_start, x_left + pill_w, y_start + pill_h], radius=14, fill=(109, 40, 217, 255))
    pill_text = "MÓDULO 07"
    d.text((x_left + 38, y_start + 11), pill_text, font=get_font(font_bold, 28), fill=(255, 255, 255, 255))
    d.text((x_left, y_start + 90), "Entrevista Laboral", font=get_font(font_extrabold, 62), fill=(15, 23, 42, 255))
    return layer

def build_class_layer_m7(class_num):
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    class_color = (124, 58, 237, 255)
    f_c = get_font(font_extrabold, 38)
    
    if class_num == 1:
        d.text((x_left, 475), "CLASE 1  ·  QUÉ PASA REALMENTE", font=f_c, fill=class_color)
        d.text((x_left, 475 + 50), "EN UN PROCESO DE ENTREVISTAS", font=f_c, fill=class_color)
    elif class_num == 2:
        d.text((x_left, 475), "CLASE 2  ·  CÓMO RESPONDER \"CONTAME SOBRE VOS\"", font=f_c, fill=class_color)
        d.text((x_left, 475 + 50), "Y CONTAR TUS LOGROS", font=f_c, fill=class_color)
    elif class_num == 3:
        d.text((x_left, 475), "CLASE 3  ·  LAS PREGUNTAS DIFÍCILES", font=f_c, fill=class_color)
        d.text((x_left, 475 + 50), "QUE REALMENTE APARECEN", font=f_c, fill=class_color)
    elif class_num == 4:
        d.text((x_left, 478), "CLASE 4  ·  LAS PREGUNTAS QUE VOS TENÉS QUE HACER", font=f_c, fill=class_color)
    elif class_num == 5:
        d.text((x_left, 475), "CLASE 5  ·  SUELDO: QUÉ DECIR", font=f_c, fill=class_color)
        d.text((x_left, 475 + 50), "CUANDO TE PREGUNTAN CUÁNTO QUERÉS GANAR", font=f_c, fill=class_color)
    return layer

def paste_animated_layer(target_img, layer_img, opacity, x_offset):
    if opacity <= 0.0:
        return
    layer_copy = layer_img.copy()
    if opacity < 1.0:
        r, g, b, a = layer_copy.split()
        a = a.point(lambda p: int(p * opacity))
        layer_copy = Image.merge("RGBA", (r, g, b, a))
    
    if x_offset == 0:
        target_img.alpha_composite(layer_copy)
    else:
        translated = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        translated.paste(layer_copy, (int(x_offset), 0), layer_copy)
        target_img.alpha_composite(translated)

def ease_out_cubic(t):
    return 1.0 - (1.0 - t) ** 3

def render_modulo_7_class(class_num, mod_layer, class_layer, output_path):
    static_base = Image.new("RGBA", (w, h), (255, 255, 255, 255))
    paste_animated_layer(static_base, stripe_layer, 1.0, 0)
    paste_animated_layer(static_base, mod_layer, 1.0, 0)
    paste_animated_layer(static_base, class_layer, 1.0, 0)
    paste_animated_layer(static_base, bot_layer, 1.0, 0)
    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, float(fps), (w, h))
    
    f_dec = get_font(font_extrabold, 310)
    
    # Velocidad optimizada para 6 segundos: 2.2 px/frame = 396 px en 6s (movimiento continuo, fluido y bien visible)
    scroll_speed = 2.2
    initial_y_offset = -60.0
    item_step = 300
    pattern_items = ["FM", "EBL"] * 25
    
    print(f"Renderizando Módulo 7 - Clase {class_num}: {total_frames} frames ({duration_sec}s)...")
    
    for f in range(total_frames):
        # Padrón derecho FM EBL con scroll continuo y contraste óptimo
        fade_wm = min(1.0, f / 12.0)
        dec_alpha = int(255 * fade_wm)
        dec_color = (236, 230, 246, dec_alpha) # Tono idéntico a M1 para visibilidad perfecta
        
        current_scroll_y = initial_y_offset - (f * scroll_speed)
        
        if f >= 78:
            frame_img = static_base.copy()
            draw_frame = ImageDraw.Draw(frame_img)
            for idx, text in enumerate(pattern_items):
                item_y = int(current_scroll_y + idx * item_step)
                if -380 <= item_y <= 1180:
                    draw_frame.text((1380, item_y), text, font=f_dec, fill=dec_color)
        else:
            frame_img = Image.new("RGBA", (w, h), (255, 255, 255, 255))
            draw_frame = ImageDraw.Draw(frame_img)
            for idx, text in enumerate(pattern_items):
                item_y = int(current_scroll_y + idx * item_step)
                if -380 <= item_y <= 1180:
                    draw_frame.text((1380, item_y), text, font=f_dec, fill=dec_color)
            
            fade_stripe = min(1.0, f / 14.0)
            paste_animated_layer(frame_img, stripe_layer, fade_stripe, 0)
            
            t_mod = np.clip((f - 15) / 21.0, 0.0, 1.0)
            prog_mod = ease_out_cubic(t_mod)
            paste_animated_layer(frame_img, mod_layer, opacity=prog_mod, x_offset=-25 * (1.0 - prog_mod))
            
            t_class = np.clip((f - 36) / 20.0, 0.0, 1.0)
            prog_class = ease_out_cubic(t_class)
            paste_animated_layer(frame_img, class_layer, opacity=prog_class, x_offset=-25 * (1.0 - prog_class))
            
            t_bot = np.clip((f - 60) / 18.0, 0.0, 1.0)
            prog_bot = ease_out_cubic(t_bot)
            paste_animated_layer(frame_img, bot_layer, opacity=prog_bot, x_offset=-25 * (1.0 - prog_bot))
        
        frame_rgb = frame_img.convert("RGB")
        frame_bgr = cv2.cvtColor(np.array(frame_rgb), cv2.COLOR_RGB2BGR)
        out.write(frame_bgr)
        
    out.release()
    print(f"-> Clase {class_num} finalizada exitosamente: {output_path}")

def main():
    base_user_folder = r"C:\Santi\Flor Martinez"
    mod7_ebl_folder = os.path.join(base_user_folder, "EBL Videos", "Modulo 7")
    mod7_intros_folder = os.path.join(base_user_folder, "Intros Modulo 7")
    os.makedirs(mod7_ebl_folder, exist_ok=True)
    os.makedirs(mod7_intros_folder, exist_ok=True)
    
    mod7_layer = build_mod_layer_m7()
    
    print("\n=======================================================")
    print(" RE-RENDERIZANDO DIAPOSITIVAS MÓDULO 07 CON SCROLL FLUIDO")
    print("=======================================================")
    for c in range(1, 6):
        class_layer = build_class_layer_m7(c)
        local_name = f"video_modulo_7_clase_{c}.mp4"
        render_modulo_7_class(c, mod7_layer, class_layer, local_name)
        
        # Copiar a EBL Videos\Modulo 7
        dest_ebl = os.path.join(mod7_ebl_folder, local_name)
        shutil.copyfile(local_name, dest_ebl)
        print(f"Actualizado en: {dest_ebl}")
        
        # Copiar a Intros Modulo 7
        dest_intro = os.path.join(mod7_intros_folder, local_name)
        shutil.copyfile(local_name, dest_intro)
        print(f"Actualizado en: {dest_intro}")

    print("\n¡Las 5 diapositivas del Módulo 7 fueron re-renderizadas y actualizadas!")

if __name__ == "__main__":
    main()
