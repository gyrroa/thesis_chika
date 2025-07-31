// service.ts
import {
  RegisterPayload,
  RegisterResponse,
  ValidationErrorResponse,
  LoginPayload,
  LoginResponse,
  RefreshPayload,
  VerifyTokenResponse,
  IsEmailExistingQuery,
  IsEmailExistingResponse,
} from './types';

const API = process.env.NEXT_PUBLIC_API_URL;
export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const res = await fetch(
    `${API}/auth/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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

export async function login(data: LoginPayload): Promise<LoginResponse> {
  const form = new URLSearchParams();
  form.append('grant_type', 'password');
  form.append('username', data.username);
  form.append('password', data.password);

  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  });

  const body = await res.json().catch(() => ({})); // Catch JSON parsing errors

  if (!res.ok) {
    const { detail } = body;

    if (res.status === 422 && Array.isArray(detail)) {
      // Field-level validation errors
      throw body as ValidationErrorResponse;
    }

    if (typeof detail === 'string') {
      // General string error
      throw new Error(detail);
    }

    // Fallback: use HTTP status
    throw new Error(res.statusText);
  }

  return body as LoginResponse;
}


// ── Refresh ──
export async function refreshToken(
  payload: RefreshPayload
): Promise<LoginResponse> {
  const res = await fetch(`${API}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const body = await res.json() as { detail?: unknown };
  if (!res.ok) {
    const { detail } = body;
    if (res.status === 422 && Array.isArray(detail)) {
      throw body as { detail: unknown[] };
    }
    if (typeof detail === 'string') {
      throw new Error(detail);
    }
    throw new Error(res.statusText);
  }
  return body as LoginResponse;
}

// ── Verify Token ──
export async function verifyToken(): Promise<VerifyTokenResponse> {
  const accessToken = localStorage.getItem('access_token'); // or get it from a context/store

  const res = await fetch(`${API}/auth/verify-token`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.text();
}

export async function isEmailExisting(
  query: IsEmailExistingQuery
): Promise<IsEmailExistingResponse> {
  const params = new URLSearchParams({ email: query.email });

  const res = await fetch(`${API}/auth/is_email_existing?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await res.json(); // 🔄 Parse as JSON, not text!

  if (!res.ok) {
    if (body?.detail) {
      throw body as ValidationErrorResponse;
    }
    throw new Error(res.statusText);
  }

  return body.exists; // ✅ Return the actual boolean from the JSON
}

