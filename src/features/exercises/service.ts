//exercises/service.ts
import type { AttemptV2Response, AttemptV2Variables, CustomAssessmentResponse, CustomAssessmentVariables, PracticeSoundVariables, PreAssessmentResponse, SoundPracticeResponse } from './types';
import type { SoundMastery } from './types';

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

export async function getSoundMastery(child_id: string): Promise<SoundMastery[]> {
  const res = await fetch(
    `${API}/exercises/child/${child_id}/sound-mastery`,
    { headers: { 'Content-Type': 'application/json' } }
  );
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.detail || res.statusText);
  }
  return body as SoundMastery[];
}

/**
 * POST /exercises/children/{child_id}/practice-sound?sound=…&nickname=…&max_items=…
 */
export async function createSoundPractice(
  child_id: string,
  { sound, nickname, max_items = 10 }: PracticeSoundVariables
): Promise<SoundPracticeResponse> {
  const params = new URLSearchParams();
  params.append('sound', sound);
  if (nickname) params.append('nickname', nickname);
  params.append('max_items', max_items.toString());

  const res = await fetch(
    `${API}/exercises/children/${child_id}/practice-sound?${params.toString()}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.detail || res.statusText);
  }
  return body as SoundPracticeResponse;
}
/**
 * POST /exercises/children/{child_id}/custom-assessment
 */
export async function createCustomAssessment(
  child_id: string,
  { difficultry_threshold, max_items, nickname }: CustomAssessmentVariables
): Promise<CustomAssessmentResponse> {
  const params = new URLSearchParams();
  if (difficultry_threshold != null) {
    params.append('difficultry_threshold', difficultry_threshold.toString());
  }
  if (max_items != null) {
    params.append('max_items', max_items.toString());
  }
  if (nickname) {
    params.append('nickname', nickname);
  }

  const res = await fetch(
    `${API}/exercises/children/${child_id}/custom-assessment?${params.toString()}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.detail || res.statusText);
  }
  return body as CustomAssessmentResponse;
}
/**
 * POST multipart/form-data to /exercises/attempt_v2
 */
export async function attemptV2(
  vars: AttemptV2Variables
): Promise<AttemptV2Response> {
  const { child_id, assessment_item_id, attempt_type, file } = vars;
  const params = new URLSearchParams({
    child_id,
    assessment_item_id: assessment_item_id.toString(),
    attempt_type,
  });

  // build form-data
  const form = new FormData();
  form.append('file', file);

  const res = await fetch(`${API}/exercises/attempt_v2?${params}`, {
    method: 'POST',
    body: form,
  });

  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.detail || res.statusText);
  }
  return body as AttemptV2Response;
}
