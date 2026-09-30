'use server';

import fs from 'fs';
import path from 'path';
import os from 'os';

export interface SolutionReviewRecord {
  id: string;
  solutionSlug: string;
  customerName: string;
  rating: number;
  text: string;
  isHidden?: boolean;
  createdAt: string;
}

declare global {
  var __fm_reviews_store: SolutionReviewRecord[] | undefined;
}

const LOCAL_STORAGE_DIR = path.join(process.cwd(), '.data');
const LOCAL_REVIEWS_FILE = path.join(LOCAL_STORAGE_DIR, 'reviews.json');
const TMP_REVIEWS_FILE = path.join(os.tmpdir(), 'reviews.json');

const initialSampleReviews: SolutionReviewRecord[] = [
  {
    id: 'rev_1',
    solutionSlug: 'finanzas-en-orden',
    customerName: 'Carolina Rossi',
    rating: 5,
    text: 'Increíble plantilla. En menos de 10 minutos pude organizar todo mi presupuesto mensual y saber exactamente en qué se me iba el dinero.',
    isHidden: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rev_2',
    solutionSlug: 'te-hago-tu-cv',
    customerName: 'Mariano Benítez',
    rating: 5,
    text: 'Flor reestructuró mi CV con palabras clave de mi industria. A la semana me llamaron para dos entrevistas de trabajo.',
    isHidden: false,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

function readReviews(): SolutionReviewRecord[] {
  if (globalThis.__fm_reviews_store && globalThis.__fm_reviews_store.length > 0) {
    return globalThis.__fm_reviews_store;
  }

  // 1. Intentar leer de .data/reviews.json
  try {
    if (fs.existsSync(LOCAL_REVIEWS_FILE)) {
      const raw = fs.readFileSync(LOCAL_REVIEWS_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        globalThis.__fm_reviews_store = parsed;
        return parsed;
      }
    }
  } catch {
    // Ignore read error
  }

  // 2. Intentar leer de /tmp/reviews.json
  try {
    if (fs.existsSync(TMP_REVIEWS_FILE)) {
      const raw = fs.readFileSync(TMP_REVIEWS_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        globalThis.__fm_reviews_store = parsed;
        return parsed;
      }
    }
  } catch {
    // Ignore read error
  }

  // 3. Fallback a muestra inicial
  globalThis.__fm_reviews_store = [...initialSampleReviews];
  saveReviews(globalThis.__fm_reviews_store);
  return globalThis.__fm_reviews_store;
}

function saveReviews(reviews: SolutionReviewRecord[]) {
  globalThis.__fm_reviews_store = reviews;

  // 1. Intentar guardar en .data/ (local dev)
  try {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf8');
  } catch {
    // En Vercel serverless process.cwd() es read-only, ignorar
  }

  // 2. Guardar en /tmp/ (Vercel serverless writable storage)
  try {
    fs.writeFileSync(TMP_REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al guardar reseña en /tmp:', err);
  }
}

export async function getSolutionReviewsAction(slug?: string, includeHidden = false): Promise<{
  success: boolean;
  reviews?: SolutionReviewRecord[];
  stats?: {
    totalReviews: number;
    averageRating: number;
    visibleReviewsCount: number;
  };
  error?: string;
}> {
  try {
    const all = readReviews();
    const normalizedTarget = slug === 'organizador-de-finanzas' ? 'finanzas-en-orden' : slug;

    const targetReviews = normalizedTarget
      ? all.filter((r) => {
          const rSlug = r.solutionSlug === 'organizador-de-finanzas' ? 'finanzas-en-orden' : r.solutionSlug;
          return rSlug === normalizedTarget;
        })
      : all;

    const totalReviews = targetReviews.length;
    const totalStars = targetReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalReviews > 0 ? Number((totalStars / totalReviews).toFixed(1)) : 5.0;

    const visible = targetReviews.filter((r) => !r.isHidden);

    return {
      success: true,
      reviews: includeHidden ? targetReviews : visible,
      stats: {
        totalReviews,
        averageRating,
        visibleReviewsCount: visible.length,
      },
    };
  } catch {
    return { success: false, error: 'Error al obtener reseñas.' };
  }
}

export async function addSolutionReviewAction(params: {
  solutionSlug: string;
  customerName: string;
  rating: number;
  text: string;
}): Promise<{ success: boolean; review?: SolutionReviewRecord; error?: string }> {
  try {
    const { solutionSlug, customerName, rating, text } = params;
    if (!solutionSlug || !customerName || !rating || !text) {
      return { success: false, error: 'Todos los campos son requeridos.' };
    }

    const normalizedSlug = solutionSlug === 'organizador-de-finanzas' ? 'finanzas-en-orden' : solutionSlug;
    const ratingNum = Math.min(5, Math.max(1, Number(rating) || 5));
    const newReview: SolutionReviewRecord = {
      id: 'rev_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      solutionSlug: normalizedSlug,
      customerName: String(customerName).trim(),
      rating: ratingNum,
      text: String(text).trim(),
      isHidden: false,
      createdAt: new Date().toISOString(),
    };

    const all = readReviews();
    all.unshift(newReview);
    saveReviews(all);

    return { success: true, review: newReview };
  } catch (err) {
    console.error('Error al guardar reseña:', err);
    return { success: false, error: 'Error al guardar la reseña.' };
  }
}

export async function toggleHideReviewAction(id: string): Promise<{ success: boolean; review?: SolutionReviewRecord; error?: string }> {
  try {
    const all = readReviews();
    const index = all.findIndex((r) => r.id === id);
    if (index === -1) {
      return { success: false, error: 'Reseña no encontrada.' };
    }

    const target = all[index]!;
    const updated: SolutionReviewRecord = {
      ...target,
      isHidden: !target.isHidden,
    };

    all[index] = updated;
    saveReviews(all);

    return { success: true, review: updated };
  } catch {
    return { success: false, error: 'Error al alternar visibilidad de la reseña.' };
  }
}

export async function deleteSolutionReviewAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    let all = readReviews();
    const initialLen = all.length;
    all = all.filter((r) => r.id !== id);

    if (all.length === initialLen) {
      return { success: false, error: 'Reseña no encontrada.' };
    }

    saveReviews(all);
    return { success: true };
  } catch {
    return { success: false, error: 'Error al eliminar la reseña.' };
  }
}
