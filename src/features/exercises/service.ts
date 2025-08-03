//exercises/service.ts
import { refreshToken } from '../auth/service';
import { LoginResponse } from '../auth/types';
import type { AttemptV2Response, AttemptV2Variables, CustomAssessmentResponse, CustomAssessmentVariables, PracticeSoundVariables, PreAssessmentResponse, SoundPracticeResponse, UnansweredPreassessmentResponse } from './types';
import type { SoundMastery } from './types';

const API = process.env.NEXT_PUBLIC_API_URL;

export async function getPreAssessmentItems(
  child_id: string
): Promise<PreAssessmentResponse> {
  const accessToken = localStorage.getItem('access_token') ?? '';
  if (!accessToken) {
    throw new Error('No access token — user must be logged in');
  }
  const res = await fetch(
    `${API}/exercises/pre-assessment/${child_id}/items`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    }
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
  const accessToken = localStorage.getItem('access_token') ?? '';
  if (!accessToken) {
    throw new Error('No access token — user must be logged in');
  }
  const params = new URLSearchParams();
  params.append('sound', sound);
  if (nickname) params.append('nickname', nickname);
  params.append('max_items', max_items.toString());

  const res = await fetch(
    `${API}/exercises/children/${child_id}/practice-sound?${params.toString()}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
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
  const accessToken = localStorage.getItem('access_token') ?? '';
  if (!accessToken) {
    throw new Error('No access token — user must be logged in');
  }
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
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
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

  const form = new FormData();
  form.append('file', file);

  interface ErrorBody { detail?: unknown }

  // helper to actually do the fetch given the current access token
  const doFetch = async (token: string): Promise<AttemptV2Response> => {
    const res = await fetch(`${API}/exercises/attempt_v3?${params}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: form,
    });

    if (res.status === 401) {
      throw new Error('UNAUTHORIZED');
    }

    const json = (await res.json()) as unknown;
    if (!res.ok) {
      const err = json as ErrorBody;
      const msg =
        typeof err.detail === 'string' ? err.detail : res.statusText;
      throw new Error(msg);
    }

    return json as AttemptV2Response;
  };

  // 1) grab the token (now a const)
  const accessToken =
    localStorage.getItem('access_token') ?? '';
  if (!accessToken) {
    throw new Error(
      'No access token—user must be logged in'
    );
  }

  try {
    // 2) try the upload
    return await doFetch(accessToken);
  } catch (err) {
    if (err instanceof Error && err.message === 'UNAUTHORIZED') {
      // 3) refresh
      const refreshTokenStr =
        localStorage.getItem('refresh_token') ?? '';
      if (!refreshTokenStr) {
        throw new Error(
          'Session expired—please log in again.'
        );
      }

      let loginResp: LoginResponse;
      try {
        loginResp = await refreshToken({
          refresh_token: refreshTokenStr,
        });
      } catch (refreshErr) {
        throw new Error(
          refreshErr instanceof Error
            ? refreshErr.message
            : 'Could not refresh session—please log in again.'
        );
      }

      // 4) store the new tokens
      localStorage.setItem(
        'access_token',
        loginResp.access_token
      );
      if (loginResp.refresh_token) {
        localStorage.setItem(
          'refresh_token',
          loginResp.refresh_token
        );
      }

      // 5) retry
      return await doFetch(loginResp.access_token);
    }

    throw err;
  }
}

/**
 * GET unanswered pre-assessment for a child
 */
export async function getUnansweredPreassessment(
  child_id: string
): Promise<UnansweredPreassessmentResponse> {
  const accessToken = localStorage.getItem('access_token') ?? '';
  if (!accessToken) {
    throw new Error('No access token — user must be logged in');
  }

  const res = await fetch(
    `${API}/exercises/${child_id}/preassessment/unanswered`,
    {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );

  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.detail || res.statusText);
  }
  return body as UnansweredPreassessmentResponse;
}
