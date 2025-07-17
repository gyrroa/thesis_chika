const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// 1) Define the shape of a single validation‐error item:
interface ErrorDetail {
  msg: string;
  [key: string]: unknown;
}

// 2) Define the overall error‐response shape:
interface ApiError {
  detail?: ErrorDetail[];
  [key: string]: unknown;
}

/** Parse JSON or return null on failure */
async function parseJSON(res: Response): Promise<unknown> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function get<T>(path: string): Promise<T> {
  const res  = await fetch(`${API_BASE}${path}`);
  const json = await parseJSON(res);

  if (!res.ok) {
    // 3) Cast into our typed error instead of `any`
    const err = json as ApiError;

    if (res.status === 422 && err.detail) {
      // validation errors
      throw err;
    }

    // pick a sensible error message
    const msg =
      Array.isArray(err.detail) && err.detail.length > 0
        ? err.detail[0].msg
        : res.statusText;

    throw new Error(msg);
  }

  return json as T;
}

export async function post<T, U = object>(
  path: string,
  body: U
): Promise<T> {
  const res  = await fetch(`${API_BASE}${path}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  const json = await parseJSON(res);

  if (!res.ok) {
    // same pattern here
    const err = json as ApiError;

    if (res.status === 422 && err.detail) {
      throw err;
    }

    const msg =
      Array.isArray(err.detail) && err.detail.length > 0
        ? err.detail[0].msg
        : res.statusText;

    throw new Error(msg);
  }

  return json as T;
}
