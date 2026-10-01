import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const candidatePaths = [
      path.join(process.cwd(), 'public', 'docs', 'Finanzas_en_Orden_Curso_Practico.pdf'),
      path.join(process.cwd(), 'apps', 'flor-martinez', 'public', 'docs', 'Finanzas_en_Orden_Curso_Practico.pdf'),
    ];

    let filePath: string | null = null;
    for (const p of candidatePaths) {
      if (fs.existsSync(/*turbopackIgnore: true*/ p)) {
        filePath = p;
        break;
      }
    }

    if (!filePath) {
      return new NextResponse('Archivo no encontrado', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(/*turbopackIgnore: true*/ filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Finanzas_en_Orden_Curso_Practico.pdf"',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Error al descargar el curso práctico:', error);
    return new NextResponse('Error al procesar la descarga', { status: 500 });
  }
}
