import type { PreAssessmentResponse } from './types';

const API = process.env.NEXT_PUBLIC_API_URL;

export async function getPreAssessmentItems(
  child_id: string
): Promise<PreAssessmentResponse> {
  const res = await fetch(
    `${API}/exercises/pre-assessment/${child_id}/items`,
    { headers: { 'Content-Type': 'application/json' } }
  );
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.detail || res.statusText);
  }
  return body as PreAssessmentResponse;
}
