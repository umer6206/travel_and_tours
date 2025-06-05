import { NextResponse } from 'next/server';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(error: unknown, status = 500) {
  const message = error instanceof Error ? error.message : 'An error occurred';
  return NextResponse.json({ error: message }, { status });
}

export function notFoundResponse(message = 'Resource not found') {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function unauthorizedResponse(message = 'Unauthorized') {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function forbiddenResponse(message = 'Forbidden') {
  return NextResponse.json({ error: message }, { status: 403 });
}

export function badRequestResponse(message = 'Bad request') {
  return NextResponse.json({ error: message }, { status: 400 });
} 