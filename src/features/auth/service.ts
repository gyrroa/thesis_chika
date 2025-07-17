import {
  RegisterPayload,
  RegisterResponse,
  ValidationErrorResponse,
} from './types';

export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    }
  );

  const body = await res.json() as { detail?: unknown };

  if (!res.ok) {
    const { detail } = body;

    // 422: array of field errors
    if (res.status === 422 && Array.isArray(detail)) {
      throw body as ValidationErrorResponse;
    }

    // 400 (or others) with a string detail
    if (typeof detail === 'string') {
      throw new Error(detail);
    }

    // fallback
    throw new Error(res.statusText);
  }

  return body as RegisterResponse;
}
