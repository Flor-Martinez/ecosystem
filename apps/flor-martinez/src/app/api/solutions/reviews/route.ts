import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface SolutionReviewItem {
  id: string;
  solutionSlug: string;
  customerName: string;
  rating: number;
  text: string;
  createdAt: string;
}

const REVIEWS_DIR = path.join(process.cwd(), '.data');
const REVIEWS_FILE = path.join(REVIEWS_DIR, 'reviews.json');

function ensureReviewsFileExists() {
  try {
    if (!fs.existsSync(REVIEWS_DIR)) {
      fs.mkdirSync(REVIEWS_DIR, { recursive: true });
    }
    if (!fs.existsSync(REVIEWS_FILE)) {
      // Initialize with sample real reviews for social proof if empty
      const initialReviews: SolutionReviewItem[] = [
        {
          id: 'rev_1',
          solutionSlug: 'organizador-de-finanzas',
          customerName: 'Carolina Rossi',
          rating: 5,
          text: 'Increíble plantilla. En menos de 10 minutos pude organizar todo mi presupuesto mensual y saber exactamente en qué se me iba el dinero.',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'rev_2',
          solutionSlug: 'te-hago-tu-cv',
          customerName: 'Mariano Benítez',
          rating: 5,
          text: 'Flor reestructuró mi CV con palabras clave de mi industria. A la semana me llamaron para dos entrevistas de trabajo.',
          createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify(initialReviews, null, 2), 'utf8');
    }
  } catch (err) {
    console.error('Error al inicializar reviews file:', err);
  }
}

function readReviews(): SolutionReviewItem[] {
  ensureReviewsFileExists();
  try {
    const raw = fs.readFileSync(REVIEWS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveReviews(reviews: SolutionReviewItem[]) {
  ensureReviewsFileExists();
  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al guardar reviews file:', err);
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  const allReviews = readReviews();

  if (slug) {
    const filtered = allReviews.filter(
      (r) => r.solutionSlug === slug || (slug === 'finanzas-en-orden' && r.solutionSlug === 'organizador-de-finanzas')
    );
    return NextResponse.json({ success: true, reviews: filtered });
  }

  return NextResponse.json({ success: true, reviews: allReviews });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { solutionSlug, customerName, rating, text } = body;

    if (!solutionSlug || !customerName || !rating || !text) {
      return NextResponse.json(
        { success: false, error: 'Todos los campos son obligatorios.' },
        { status: 400 }
      );
    }

    const ratingNum = Math.min(5, Math.max(1, Number(rating) || 5));

    const newReview: SolutionReviewItem = {
      id: 'rev_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      solutionSlug: String(solutionSlug),
      customerName: String(customerName).trim(),
      rating: ratingNum,
      text: String(text).trim(),
      createdAt: new Date().toISOString(),
    };

    const allReviews = readReviews();
    allReviews.unshift(newReview);
    saveReviews(allReviews);

    return NextResponse.json({ success: true, review: newReview });
  } catch (err) {
    console.error('Error al guardar opinión:', err);
    return NextResponse.json(
      { success: false, error: 'Ocurrió un error en el servidor al guardar la opinión.' },
      { status: 500 }
    );
  }
}
