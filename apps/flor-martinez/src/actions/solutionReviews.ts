'use server';

import fs from 'fs';
import path from 'path';

export interface SolutionReviewRecord {
  id: string;
  solutionSlug: string;
  customerName: string;
  rating: number;
  text: string;
  isHidden?: boolean;
  createdAt: string;
}

const LOCAL_STORAGE_DIR = path.join(process.cwd(), '.data');
const REVIEWS_FILE = path.join(LOCAL_STORAGE_DIR, 'reviews.json');

function ensureReviewsFileExists() {
  try {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
    }
    if (!fs.existsSync(REVIEWS_FILE)) {
      const initialReviews: SolutionReviewRecord[] = [
        {
          id: 'rev_1',
          solutionSlug: 'organizador-de-finanzas',
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
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify(initialReviews, null, 2), 'utf8');
    }
  } catch (err) {
    console.error('Error al inicializar reviews.json:', err);
  }
}

function readReviews(): SolutionReviewRecord[] {
  ensureReviewsFileExists();
  try {
    const raw = fs.readFileSync(REVIEWS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveReviews(reviews: SolutionReviewRecord[]) {
  ensureReviewsFileExists();
  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al guardar reviews.json:', err);
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
    const targetReviews = slug
      ? all.filter((r) => r.solutionSlug === slug || (slug === 'finanzas-en-orden' && r.solutionSlug === 'organizador-de-finanzas'))
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

    const ratingNum = Math.min(5, Math.max(1, Number(rating) || 5));
    const newReview: SolutionReviewRecord = {
      id: 'rev_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      solutionSlug: String(solutionSlug),
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
