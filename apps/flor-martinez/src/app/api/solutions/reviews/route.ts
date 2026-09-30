import { NextRequest, NextResponse } from 'next/server';
import {
  getSolutionReviewsAction,
  addSolutionReviewAction,
  toggleHideReviewAction,
  deleteSolutionReviewAction,
} from '@/actions/solutionReviews';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || undefined;
  const admin = searchParams.get('admin') === 'true';

  const res = await getSolutionReviewsAction(slug, admin);
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { solutionSlug, customerName, rating, text } = body;

    const res = await addSolutionReviewAction({ solutionSlug, customerName, rating, text });
    if (!res.success) {
      return NextResponse.json(res, { status: 400 });
    }
    return NextResponse.json(res);
  } catch {
    return NextResponse.json({ success: false, error: 'Error inesperado.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID de reseña requerido.' }, { status: 400 });
    }

    const res = await toggleHideReviewAction(id);
    return NextResponse.json(res);
  } catch {
    return NextResponse.json({ success: false, error: 'Error inesperado al ocultar reseña.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID de reseña requerido.' }, { status: 400 });
    }

    const res = await deleteSolutionReviewAction(id);
    return NextResponse.json(res);
  } catch {
    return NextResponse.json({ success: false, error: 'Error inesperado al eliminar reseña.' }, { status: 500 });
  }
}
