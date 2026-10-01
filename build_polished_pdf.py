import json
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

# Page dimensions for A4
PAGE_WIDTH, PAGE_HEIGHT = A4

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, total_pages):
        page_num = self._pageNumber
        if page_num == 1:
            # Cover page has its own cover styling
            return

        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))

        # Top Running Header
        self.drawString(42, PAGE_HEIGHT - 30, "FINANZAS EN ORDEN  •  Curso Práctico")
        self.drawRightString(PAGE_WIDTH - 42, PAGE_HEIGHT - 30, f"Página {page_num} de {total_pages}")
        
        # Header thin divider
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.75)
        self.line(42, PAGE_HEIGHT - 34, PAGE_WIDTH - 42, PAGE_HEIGHT - 34)

        # Bottom Running Footer
        self.line(42, 34, PAGE_WIDTH - 42, 34)
        self.drawString(42, 24, "Florencia Martínez  •  flormartinezok.com")
        self.drawRightString(PAGE_WIDTH - 42, 24, "Material exclusivo para uso personal")
        
        self.restoreState()

def build_pdf():
    with open('scratch_pdf_pages.json', 'r', encoding='utf-8') as f:
        pages = json.load(f)

    pdf_filename = 'apps/flor-martinez/public/docs/Finanzas_en_Orden_Curso_Practico.pdf'
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=A4,
        leftMargin=42,
        rightMargin=42,
        topMargin=46,
        bottomMargin=46,
        title="Finanzas en Orden - Curso Practico",
        author="Florencia Martinez",
        subject="Guia practica de finanzas personales, presupuestos y control de gastos",
        creator="Florencia Martinez - flormartinezok.com",
    )

    styles = getSampleStyleSheet()

    # Custom harmonious typography styles
    color_primary = colors.HexColor("#1C4D37")      # Deep Emerald Green
    color_secondary = colors.HexColor("#9C5724")    # Warm Terracotta/Bronze
    color_dark = colors.HexColor("#0F172A")         # Dark Navy Slate
    color_body = colors.HexColor("#334155")         # Slate Body Text
    color_subtle = colors.HexColor("#64748B")       # Subtle Slate
    color_border = colors.HexColor("#E2E8F0")

    # Typography styles with comfortable line height (leading) and spacing
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.8,
        textColor=color_body,
        spaceAfter=7,
    )

    body_bold = ParagraphStyle(
        'CustomBodyBold',
        parent=body_style,
        fontName='Helvetica-Bold',
        textColor=color_dark,
    )

    concept_heading = ParagraphStyle(
        'ConceptHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=color_primary,
        spaceBefore=7,
        spaceAfter=2,
    )

    module_badge = ParagraphStyle(
        'ModuleBadge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=color_secondary,
        textTransform='uppercase',
        spaceAfter=3,
    )

    module_title = ParagraphStyle(
        'ModuleTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=color_dark,
        spaceAfter=7,
    )

    objective_style = ParagraphStyle(
        'ObjectiveStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.2,
        leading=13.5,
        textColor=colors.HexColor("#14532D"),
    )

    card_label_style = ParagraphStyle(
        'CardLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=color_dark,
        spaceAfter=2,
    )

    card_text_style = ParagraphStyle(
        'CardText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=12.5,
        textColor=color_body,
    )

    story = []

    # =========================================================================
    # PAGE 1: PORTADA
    # =========================================================================
    story.append(Spacer(1, 50))
    story.append(Paragraph("FLORENCIA MARTÍNEZ", ParagraphStyle(
        'CoverPre', fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=color_secondary, alignment=1, spaceAfter=20
    )))
    story.append(Paragraph("FINANZAS EN ORDEN", ParagraphStyle(
        'CoverTitle', fontName='Helvetica-Bold', fontSize=34, leading=40, textColor=color_primary, alignment=1, spaceAfter=14
    )))
    story.append(Paragraph("Curso práctico de finanzas personales desde cero", ParagraphStyle(
        'CoverSubtitle', fontName='Helvetica-Bold', fontSize=15, leading=20, textColor=color_dark, alignment=1, spaceAfter=8
    )))
    story.append(Paragraph("Entendé tu dinero  •  organizá tus decisiones  •  construí un sistema sostenible", ParagraphStyle(
        'CoverTagline', fontName='Helvetica', fontSize=11, leading=16, textColor=color_subtle, alignment=1, spaceAfter=45
    )))

    # 3 Badges Box Table
    badge_data = [
        [
            Paragraph("<b>12 MÓDULOS</b><br/><font color='#64748B' size='8'>sin tecnicismos</font>", ParagraphStyle('B1', fontName='Helvetica', fontSize=10, leading=14, alignment=1, textColor=color_primary)),
            Paragraph("<b>CASOS REALES</b><br/><font color='#64748B' size='8'>con números</font>", ParagraphStyle('B2', fontName='Helvetica', fontSize=10, leading=14, alignment=1, textColor=color_primary)),
            Paragraph("<b>ACCIÓN</b><br/><font color='#64748B' size='8'>para aplicar cada semana</font>", ParagraphStyle('B3', fontName='Helvetica', fontSize=10, leading=14, alignment=1, textColor=color_primary)),
        ]
    ]
    t_badges = Table(badge_data, colWidths=[160, 160, 160])
    t_badges.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FAF7F2")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2D5C8")),
        ('INNERGRID', (0,0), (-1,-1), 0.75, colors.HexColor("#E2D5C8")),
        ('TOPPADDING', (0,0), (-1,-1), 14),
        ('BOTTOMPADDING', (0,0), (-1,-1), 14),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    story.append(t_badges)

    story.append(Spacer(1, 140))
    story.append(Paragraph("<b>Florencia Martínez</b>", ParagraphStyle(
        'CoverAuthor', fontName='Helvetica-Bold', fontSize=13, leading=16, textColor=color_dark, alignment=1, spaceAfter=4
    )))
    story.append(Paragraph("Material complementario del Organizador Financiero Personal", ParagraphStyle(
        'CoverFooter', fontName='Helvetica', fontSize=9.5, leading=13, textColor=color_subtle, alignment=1
    )))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: ANTES DE EMPEZAR
    # =========================================================================
    story.append(Paragraph("Antes de empezar", ParagraphStyle('H1Sec', fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=color_primary, spaceAfter=14)))
    story.append(Paragraph("Este curso está pensado para personas que quieren ordenar sus finanzas cotidianas sin convertirse en especialistas. La planilla te ayuda a registrar y visualizar; estas páginas te enseñan a interpretar lo que pasa y a tomar decisiones más conscientes.", body_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Qué vas a aprender", ParagraphStyle('H2Sec', fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=color_dark, spaceAfter=8)))
    story.append(Paragraph("Vas a trabajar sobre flujo mensual, presupuesto, ahorro, compras impulsivas, tarjetas, cuotas, fondo de emergencia, metas, deudas, ingresos variables, gastos anuales y cierre financiero. El objetivo no es perseguir una fórmula perfecta, sino construir un sistema que puedas sostener.", body_style))
    story.append(Spacer(1, 12))

    # Warning Box
    warn_p = Paragraph("<b>Importante:</b> este contenido es educativo y general. No constituye asesoramiento financiero, contable, impositivo ni de inversión. Para créditos, refinanciaciones, inversiones, impuestos o situaciones complejas de endeudamiento, evaluá las condiciones particulares y consultá profesionales habilitados.", ParagraphStyle('WarnTxt', fontName='Helvetica', fontSize=9, leading=13.5, textColor=colors.HexColor("#92400E")))
    t_warn = Table([[warn_p]], colWidths=[511])
    t_warn.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FEF3C7")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#FDE68A")),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
    ]))
    story.append(t_warn)
    story.append(Spacer(1, 14))

    story.append(Paragraph("Cómo aprovecharlo", ParagraphStyle('H3Sec', fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=color_dark, spaceAfter=8)))
    story.append(Paragraph("Leé un módulo por vez. No intentes aplicar todo el mismo día. Cada módulo termina con un caso, un error frecuente y una acción concreta para esa semana.", body_style))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: MAPA DEL CURSO (TABLE)
    # =========================================================================
    story.append(Paragraph("Mapa del curso", ParagraphStyle('MapH1', fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=color_primary, spaceAfter=6)))
    story.append(Paragraph("Un recorrido estructurado de 12 pasos para construir tu tranquilidad financiera:", ParagraphStyle('MapSub', fontName='Helvetica', fontSize=10, leading=14, textColor=color_subtle, spaceAfter=14)))

    modules_map = [
        ("MÓDULO 1", "Por qué llego a fin de mes sin plata"),
        ("MÓDULO 2", "Qué hacer cuando cobrás"),
        ("MÓDULO 3", "Cómo armar un presupuesto realista"),
        ("MÓDULO 4", "Gastos invisibles y compras impulsivas"),
        ("MÓDULO 5", "Cómo empezar a ahorrar"),
        ("MÓDULO 6", "Tarjetas y cuotas sin perder el control"),
        ("MÓDULO 7", "Fondo de emergencia"),
        ("MÓDULO 8", "Metas y gastos grandes"),
        ("MÓDULO 9", "Qué hacer si tenés deudas"),
        ("MÓDULO 10", "Cómo organizar ingresos variables"),
        ("MÓDULO 11", "Cómo anticipar gastos anuales"),
        ("MÓDULO 12", "Tu cierre financiero mensual"),
    ]

    map_table_data = [[
        Paragraph("<b>MÓDULO</b>", ParagraphStyle('TH1', fontName='Helvetica-Bold', fontSize=9.5, textColor=colors.white)),
        Paragraph("<b>TEMA CENTRAL</b>", ParagraphStyle('TH2', fontName='Helvetica-Bold', fontSize=9.5, textColor=colors.white)),
    ]]

    for mod, tema in modules_map:
        map_table_data.append([
            Paragraph(f"<b>{mod}</b>", ParagraphStyle('TD1', fontName='Helvetica-Bold', fontSize=9, leading=13, textColor=color_primary)),
            Paragraph(tema, ParagraphStyle('TD2', fontName='Helvetica', fontSize=9.5, leading=13.5, textColor=color_dark)),
        ])

    t_map = Table(map_table_data, colWidths=[110, 401])
    t_map.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), color_primary),
        ('ALIGN', (0,0), (0,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor("#FFFFFF"), colors.HexColor("#FAF7F2")]),
        ('GRID', (0,0), (-1,-1), 0.5, color_border),
    ]))
    story.append(t_map)
    story.append(PageBreak())

    # =========================================================================
    # PAGES 4 TO 15: MODULES 1 TO 12
    # =========================================================================
    def render_module_page(p_num):
        raw = pages[p_num - 1]['text']
        lines = [l.strip() for l in raw.split('\n') if l.strip()]

        # Filter out running header and page num if present
        clean_lines = []
        for l in lines:
            if "FINANZAS EN ORDEN" in l and "Curso" in l:
                continue
            if l.isdigit() and int(l) == p_num:
                continue
            clean_lines.append(l)

        # Module Header
        mod_label = clean_lines[0] # e.g. MÓDULO 1
        mod_title = clean_lines[1] # e.g. ¿Por qué llego a fin de mes sin plata?
        obj_line = clean_lines[2]  # e.g. Objetivo: ...

        # Split remaining lines by keywords
        text_rest = "\n".join(clean_lines[3:])
        
        pos_caso = text_rest.find("CASO PRÁCTICO")
        pos_error = text_rest.find("ERROR FRECUENTE")
        pos_accion = text_rest.find("QUÉ HACER ESTA SEMANA")
        pos_org = text_rest.find("LLEVALO A TU ORGANIZADOR")

        concepts_block = text_rest[:pos_caso].strip()
        caso_block = text_rest[pos_caso + len("CASO PRÁCTICO"):pos_error].strip()
        error_block = text_rest[pos_error + len("ERROR FRECUENTE"):pos_accion].strip()
        accion_block = text_rest[pos_accion + len("QUÉ HACER ESTA SEMANA"):pos_org].strip()
        org_block = text_rest[pos_org + len("LLEVALO A TU ORGANIZADOR"):].strip()

        # Build Page Flowables
        story.append(Paragraph(mod_label, module_badge))
        story.append(Paragraph(mod_title, module_title))

        # Objective Callout
        t_obj = Table([[Paragraph(f"<b>{obj_line}</b>", objective_style)]], colWidths=[511])
        t_obj.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F0FDF4")),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#BBF7D0")),
            ('TOPPADDING', (0,0), (-1,-1), 7),
            ('BOTTOMPADDING', (0,0), (-1,-1), 7),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
            ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ]))
        story.append(t_obj)
        story.append(Spacer(1, 10))

        # Parse Concepts: usually 4 concepts, each with a bold heading and body
        concept_lines = [cl.strip() for cl in concepts_block.split('\n') if cl.strip()]
        idx = 0
        while idx < len(concept_lines):
            c_title = concept_lines[idx]
            idx += 1
            c_body_parts = []
            while idx < len(concept_lines) and not (
                # Next concept heading condition (starts with uppercase, relatively short, no terminal period)
                len(concept_lines[idx]) < 55 and not concept_lines[idx].endswith('.') and not concept_lines[idx].startswith('Podés') and not concept_lines[idx].startswith('Cuotas') and not concept_lines[idx].startswith('Ver dinero') and not concept_lines[idx].startswith('Patente') and not concept_lines[idx].startswith('Separ') and not concept_lines[idx].startswith('Definí') and not concept_lines[idx].startswith('Reserv') and not concept_lines[idx].startswith('Dejá') and not concept_lines[idx].startswith('Un presupuesto') and not concept_lines[idx].startswith('Si te') and not concept_lines[idx].startswith('Un café') and not concept_lines[idx].startswith('Un descuento') and not concept_lines[idx].startswith('Esperar') and not concept_lines[idx].startswith('Revisá') and not concept_lines[idx].startswith('Si el') and not concept_lines[idx].startswith('Un monto') and not concept_lines[idx].startswith('Fondo') and not concept_lines[idx].startswith('Si tus') and not concept_lines[idx].startswith('Una cuota') and not concept_lines[idx].startswith('Antes de') and not concept_lines[idx].startswith('Aunque') and not concept_lines[idx].startswith('Financiar') and not concept_lines[idx].startswith('Es dinero') and not concept_lines[idx].startswith('Vacaciones') and not concept_lines[idx].startswith('Calculá') and not concept_lines[idx].startswith('Estabilidad') and not concept_lines[idx].startswith('Una meta') and not concept_lines[idx].startswith('Viaje:') and not concept_lines[idx].startswith('Monto') and not concept_lines[idx].startswith('Si el aporte') and not concept_lines[idx].startswith('Anotá') and not concept_lines[idx].startswith('Antes de acelerar') and not concept_lines[idx].startswith('Comparar') and not concept_lines[idx].startswith('Una cuota menor') and not concept_lines[idx].startswith('Revisá varios') and not concept_lines[idx].startswith('Un bono') and not concept_lines[idx].startswith('Podés') and not concept_lines[idx].startswith('Tu presupuesto') and not concept_lines[idx].startswith('Si estimás') and not concept_lines[idx].startswith('El dinero') and not concept_lines[idx].startswith('Los precios') and not concept_lines[idx].startswith('Mirá') and not concept_lines[idx].startswith('Si una') and not concept_lines[idx].startswith('Cambiar') and not concept_lines[idx].startswith('Presupuesto')
            ):
                c_body_parts.append(concept_lines[idx])
                idx += 1

            story.append(Paragraph(c_title, concept_heading))
            story.append(Paragraph(" ".join(c_body_parts), body_style))

        story.append(Spacer(1, 8))

        # 4 Callout Cards Table
        # We present them as clean, well-spaced visual cards
        callouts_table_data = [
            [
                Table([
                    [Paragraph("<b>💡 CASO PRÁCTICO</b>", ParagraphStyle('C1', fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=color_primary))],
                    [Paragraph(caso_block.replace('\n', ' '), card_text_style)],
                ], colWidths=[503])
            ],
            [
                Table([
                    [Paragraph("<b>⚠️ ERROR FRECUENTE</b>", ParagraphStyle('C2', fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=colors.HexColor("#B91C1C")))],
                    [Paragraph(error_block.replace('\n', ' '), card_text_style)],
                ], colWidths=[503])
            ],
            [
                Table([
                    [Paragraph("<b>🎯 QUÉ HACER ESTA SEMANA</b>", ParagraphStyle('C3', fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=colors.HexColor("#15803D")))],
                    [Paragraph(accion_block.replace('\n', ' '), card_text_style)],
                ], colWidths=[503])
            ],
            [
                Table([
                    [Paragraph("<b>📊 LLEVALO A TU ORGANIZADOR</b>", ParagraphStyle('C4', fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=colors.HexColor("#92400E")))],
                    [Paragraph(org_block.replace('\n', ' '), card_text_style)],
                ], colWidths=[503])
            ]
        ]

        t_callouts = Table(callouts_table_data, colWidths=[511])
        t_callouts.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F8FAFC")),
            ('BOX', (0,0), (-1,0), 1, colors.HexColor("#E2E8F0")),
            
            ('BACKGROUND', (0,1), (-1,1), colors.HexColor("#FEF2F2")),
            ('BOX', (0,1), (-1,1), 1, colors.HexColor("#FECACA")),
            
            ('BACKGROUND', (0,2), (-1,2), colors.HexColor("#F0FDF4")),
            ('BOX', (0,2), (-1,2), 1, colors.HexColor("#BBF7D0")),
            
            ('BACKGROUND', (0,3), (-1,3), colors.HexColor("#FEF3C7")),
            ('BOX', (0,3), (-1,3), 1, colors.HexColor("#FDE68A")),

            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
            ('BOTTOMPADDING', (0,0), (0,0), 7),
            ('BOTTOMPADDING', (0,1), (0,1), 7),
            ('BOTTOMPADDING', (0,2), (0,2), 7),
            ('BOTTOMPADDING', (0,3), (0,3), 7),
        ]))

        story.append(t_callouts)
        story.append(PageBreak())

    for mod_i in range(1, 13):
        render_module_page(mod_i + 3)

    # =========================================================================
    # PAGE 16: BONUS 1 (CHECKLIST TABLE)
    # =========================================================================
    story.append(Paragraph("BONUS 1", module_badge))
    story.append(Paragraph("Checklist: ¿realmente puedo permitirme esta compra?", module_title))
    story.append(Paragraph("No existe una respuesta automática, pero estas preguntas ayudan a decidir con más información.", body_style))
    story.append(Spacer(1, 10))

    checklist_questions = [
        "¿Mis gastos esenciales del período ya están cubiertos?",
        "¿Tengo cuotas o vencimientos próximos que todavía no pagué?",
        "¿Esta compra estaba prevista?",
        "¿Afecta una meta que considero más importante?",
        "¿La compraría si no estuviera en oferta?",
        "¿Puedo esperar 48 horas antes de decidir?",
        "Si es financiada, ¿miré el costo y mis cuotas totales?",
    ]

    chk_data = [[
        Paragraph("<b>PREGUNTA DE EVALUACIÓN CONSCIENTE</b>", ParagraphStyle('CKH1', fontName='Helvetica-Bold', fontSize=9.5, textColor=colors.white)),
        Paragraph("<b>MI RESPUESTA</b>", ParagraphStyle('CKH2', fontName='Helvetica-Bold', fontSize=9.5, textColor=colors.white, alignment=1)),
    ]]

    for q in checklist_questions:
        chk_data.append([
            Paragraph(q, ParagraphStyle('CKQ', fontName='Helvetica', fontSize=9.5, leading=14, textColor=color_dark)),
            Paragraph("[  ] SÍ &nbsp;&nbsp;&nbsp;&nbsp; [  ] NO", ParagraphStyle('CKA', fontName='Helvetica-Bold', fontSize=9, leading=14, textColor=color_primary, alignment=1)),
        ])

    t_chk = Table(chk_data, colWidths=[381, 130])
    t_chk.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), color_primary),
        ('ALIGN', (0,0), (0,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor("#FFFFFF"), colors.HexColor("#FAF7F2")]),
        ('GRID', (0,0), (-1,-1), 0.5, color_border),
    ]))
    story.append(t_chk)
    story.append(Spacer(1, 18))
    story.append(Paragraph("<i>La finalidad no es impedirte comprar: es separar una decisión consciente de una reacción automática.</i>", ParagraphStyle('CkFoot', fontName='Helvetica-Oblique', fontSize=9.5, leading=14, textColor=color_subtle, alignment=1)))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 17: BONUS 2 (QUÉ HACER CON UN INGRESO EXTRA)
    # =========================================================================
    story.append(Paragraph("BONUS 2", module_badge))
    story.append(Paragraph("Qué hacer con un ingreso extra", module_title))
    story.append(Paragraph("Aguinaldo, comisión, bono o devolución pueden sentirse como dinero completamente libre. Antes de gastarlo, revisá cuatro posibles destinos: obligaciones pendientes, respaldo, objetivos y disfrute.", body_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("No necesitás aplicar un porcentaje fijo. Priorizá según tu situación actual. Si tenés una obligación urgente, puede tener más peso; si tu presupuesto está ordenado, podés distribuir el extra entre objetivos y disfrute.", body_style))
    story.append(Spacer(1, 14))

    # Fillable Box
    fill_data = [
        [Paragraph("<b>PLANIFICACIÓN DE MI PRÓXIMO INGRESO EXTRA</b>", ParagraphStyle('FTH', fontName='Helvetica-Bold', fontSize=10, textColor=color_primary))],
        [Paragraph("Monto estimado: $ ________________________________________", ParagraphStyle('FT1', fontName='Helvetica', fontSize=10, leading=22, textColor=color_dark))],
        [Paragraph("Prioridad 1 (Obligaciones / Deudas): ________________________________________", ParagraphStyle('FT2', fontName='Helvetica', fontSize=10, leading=22, textColor=color_dark))],
        [Paragraph("Prioridad 2 (Fondo de respaldo / Ahorro): ________________________________________", ParagraphStyle('FT3', fontName='Helvetica', fontSize=10, leading=22, textColor=color_dark))],
        [Paragraph("Prioridad 3 (Disfrute / Meta personal): ________________________________________", ParagraphStyle('FT4', fontName='Helvetica', fontSize=10, leading=22, textColor=color_dark))],
    ]
    t_fill = Table(fill_data, colWidths=[511])
    t_fill.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FAF7F2")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2D5C8")),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 16),
        ('RIGHTPADDING', (0,0), (-1,-1), 16),
    ]))
    story.append(t_fill)
    story.append(Spacer(1, 24))
    story.append(Paragraph("💡 <i>Una buena pregunta: ¿qué decisión agradecería haber tomado con este dinero dentro de seis meses?</i>", ParagraphStyle('B2Foot', fontName='Helvetica-Oblique', fontSize=10, leading=15, textColor=color_secondary, alignment=1)))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 18: BONUS 3 (DINERO EN PAREJA)
    # =========================================================================
    story.append(Paragraph("BONUS 3", module_badge))
    story.append(Paragraph("Dinero en pareja", module_title))
    story.append(Paragraph("No existe un único modelo correcto. Algunas parejas separan todo, otras comparten gastos y otras combinan ambos sistemas. Lo importante es que los acuerdos sean explícitos.", body_style))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("Conversaciones que conviene tener", ParagraphStyle('B3H', fontName='Helvetica-Bold', fontSize=11, leading=15, textColor=color_primary, spaceBefore=8, spaceAfter=4)))
    story.append(Paragraph("¿Qué gastos son compartidos? ¿Cómo se dividen? ¿Qué objetivos tienen en común? ¿Existen deudas u obligaciones que impactan en la planificación? ¿Qué compras deberían conversar? ¿Cuánta autonomía quiere mantener cada persona?", body_style))
    story.append(Spacer(1, 4))

    story.append(Paragraph("Dividir 50/50 y aportar proporcionalmente a los ingresos son modelos diferentes. La elección depende de acuerdos, ingresos y circunstancias; no hay una fórmula universal.", body_style))
    story.append(Spacer(1, 14))

    # Goal box
    couple_data = [
        [Paragraph("<b>NUESTRO PRÓXIMO OBJETIVO COMPARTIDO:</b>", ParagraphStyle('CPH', fontName='Helvetica-Bold', fontSize=10, textColor=color_primary))],
        [Paragraph("Objetivo: ____________________________________________________________________", ParagraphStyle('CP1', fontName='Helvetica', fontSize=10, leading=22, textColor=color_dark))],
        [Paragraph("Monto estimado: $ ____________________________ &nbsp;&nbsp;&nbsp;&nbsp; Fecha estimada: ____________________________", ParagraphStyle('CP2', fontName='Helvetica', fontSize=10, leading=22, textColor=color_dark))],
    ]
    t_couple = Table(couple_data, colWidths=[511])
    t_couple.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FAF7F2")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2D5C8")),
        ('TOPPADDING', (0,0), (-1,-1), 14),
        ('BOTTOMPADDING', (0,0), (-1,-1), 14),
        ('LEFTPADDING', (0,0), (-1,-1), 16),
        ('RIGHTPADDING', (0,0), (-1,-1), 16),
    ]))
    story.append(t_couple)
    story.append(PageBreak())

    # =========================================================================
    # PAGE 19: BONUS 4 (PLAN 90 DÍAS)
    # =========================================================================
    story.append(Paragraph("BONUS 4", module_badge))
    story.append(Paragraph("Tu plan financiero de 90 días", module_title))
    story.append(Spacer(1, 4))

    plan_data = [
        [
            Paragraph("<b>PERÍODO</b>", ParagraphStyle('P1', fontName='Helvetica-Bold', fontSize=9.5, textColor=colors.white)),
            Paragraph("<b>FOCO</b>", ParagraphStyle('P2', fontName='Helvetica-Bold', fontSize=9.5, textColor=colors.white)),
            Paragraph("<b>ACCIÓN PRINCIPAL</b>", ParagraphStyle('P3', fontName='Helvetica-Bold', fontSize=9.5, textColor=colors.white)),
        ],
        [
            Paragraph("<b>Días 1–30</b>", ParagraphStyle('PR1', fontName='Helvetica-Bold', fontSize=9, textColor=color_primary)),
            Paragraph("<b>CLARIDAD</b>", ParagraphStyle('PR2', fontName='Helvetica-Bold', fontSize=9, textColor=color_dark)),
            Paragraph("Registrar, identificar cuotas, suscripciones y gastos reales.", ParagraphStyle('PR3', fontName='Helvetica', fontSize=9, leading=13, textColor=color_body)),
        ],
        [
            Paragraph("<b>Días 31–60</b>", ParagraphStyle('PR4', fontName='Helvetica-Bold', fontSize=9, textColor=color_primary)),
            Paragraph("<b>PLANIFICACIÓN</b>", ParagraphStyle('PR5', fontName='Helvetica-Bold', fontSize=9, textColor=color_dark)),
            Paragraph("Ajustar presupuesto, separar una meta y anticipar gastos.", ParagraphStyle('PR6', fontName='Helvetica', fontSize=9, leading=13, textColor=color_body)),
        ],
        [
            Paragraph("<b>Días 61–90</b>", ParagraphStyle('PR7', fontName='Helvetica-Bold', fontSize=9, textColor=color_primary)),
            Paragraph("<b>CONSOLIDACIÓN</b>", ParagraphStyle('PR8', fontName='Helvetica-Bold', fontSize=9, textColor=color_dark)),
            Paragraph("Revisar resultados, aumentar lo sostenible y mantener hábitos.", ParagraphStyle('PR9', fontName='Helvetica', fontSize=9, leading=13, textColor=color_body)),
        ]
    ]
    t_plan = Table(plan_data, colWidths=[90, 110, 311])
    t_plan.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), color_primary),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor("#FFFFFF"), colors.HexColor("#FAF7F2")]),
        ('GRID', (0,0), (-1,-1), 0.5, color_border),
    ]))
    story.append(t_plan)
    story.append(Spacer(1, 16))

    plan_commit_data = [
        [Paragraph("Mi objetivo principal de estos 90 días: ____________________________________________________________________", ParagraphStyle('PC1', fontName='Helvetica', fontSize=9.5, leading=22, textColor=color_dark))],
        [Paragraph("¿Cómo voy a medir que avancé? ____________________________________________________________________", ParagraphStyle('PC2', fontName='Helvetica', fontSize=9.5, leading=22, textColor=color_dark))],
    ]
    t_commit = Table(plan_commit_data, colWidths=[511])
    t_commit.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FAF7F2")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2D5C8")),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
    ]))
    story.append(t_commit)
    story.append(Spacer(1, 16))
    story.append(Paragraph("<i>Recordá: mejorar tus finanzas no requiere perfección. Requiere información, decisiones conscientes y un sistema que puedas repetir.</i>", ParagraphStyle('PlFoot', fontName='Helvetica-Oblique', fontSize=9.5, leading=14, textColor=color_subtle, alignment=1)))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 20: CIERRE
    # =========================================================================
    story.append(Paragraph("Cierre", module_title))
    story.append(Paragraph("La planilla te muestra qué pasó. Este curso te ayuda a entender por qué pasó y decidir qué hacer después.", ParagraphStyle('CL1', fontName='Helvetica', fontSize=10.5, leading=15, textColor=color_dark, spaceAfter=14)))

    story.append(Paragraph("Tu sistema en seis pasos", ParagraphStyle('CL2', fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=color_primary, spaceAfter=10)))

    steps_data = [
        [
            Paragraph("<b>1. REGISTRÁ</b><br/><font color='#475569'>Conocé tus números.</font>", ParagraphStyle('S1', fontName='Helvetica', fontSize=9.5, leading=14, textColor=color_dark)),
            Paragraph("<b>2. SEPARÁ</b><br/><font color='#475569'>Dale función al dinero.</font>", ParagraphStyle('S2', fontName='Helvetica', fontSize=9.5, leading=14, textColor=color_dark)),
        ],
        [
            Paragraph("<b>3. PLANIFICÁ</b><br/><font color='#475569'>Decidí antes de gastar.</font>", ParagraphStyle('S3', fontName='Helvetica', fontSize=9.5, leading=14, textColor=color_dark)),
            Paragraph("<b>4. PROTEGÉ</b><br/><font color='#475569'>Construí margen y reservas.</font>", ParagraphStyle('S4', fontName='Helvetica', fontSize=9.5, leading=14, textColor=color_dark)),
        ],
        [
            Paragraph("<b>5. PRIORIZÁ</b><br/><font color='#475569'>Convertí metas en aportes.</font>", ParagraphStyle('S5', fontName='Helvetica', fontSize=9.5, leading=14, textColor=color_dark)),
            Paragraph("<b>6. REVISÁ</b><br/><font color='#475569'>Ajustá una vez al mes.</font>", ParagraphStyle('S6', fontName='Helvetica', fontSize=9.5, leading=14, textColor=color_dark)),
        ],
    ]
    t_steps = Table(steps_data, colWidths=[250, 250])
    t_steps.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FAF7F2")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2D5C8")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2D5C8")),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
    ]))
    story.append(t_steps)
    story.append(Spacer(1, 16))

    cierre_box = [
        [Paragraph("<b>MI PRÓXIMA DECISIÓN FINANCIERA SERÁ:</b>", ParagraphStyle('CB1', fontName='Helvetica-Bold', fontSize=9.5, textColor=color_primary))],
        [Paragraph("________________________________________________________________________________________", ParagraphStyle('CB2', fontName='Helvetica', fontSize=9.5, leading=20, textColor=color_dark))],
        [Paragraph("________________________________________________________________________________________", ParagraphStyle('CB3', fontName='Helvetica', fontSize=9.5, leading=20, textColor=color_dark))],
    ]
    t_cierre = Table(cierre_box, colWidths=[511])
    t_cierre.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
    ]))
    story.append(t_cierre)
    story.append(Spacer(1, 22))

    story.append(Paragraph("© 2026 Florencia Martínez · Material educativo para uso personal del comprador. No redistribuir ni revender.", ParagraphStyle('Cop', fontName='Helvetica', fontSize=8, leading=11, textColor=color_subtle, alignment=1)))

    # Build the document with our custom NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print("PDF generated successfully with exact page layout and elegant spacing!")

if __name__ == '__main__':
    build_pdf()
