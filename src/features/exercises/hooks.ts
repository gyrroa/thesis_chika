//exercises/hooks.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { attemptV2, createCustomAssessment, createSoundPractice, getPreAssessmentItems, getSoundMastery } from './service';
import type { AttemptV2Response, AttemptV2Variables, CustomAssessmentResponse, CustomAssessmentVariables, PracticeSoundVariables, PreAssessmentResponse, SoundMastery, SoundPracticeResponse } from './types';

/**
 * React Query hook for fetching pre-assessment items.
 * @param child_id The ID of the child to fetch items for
 */
export function usePreAssessmentItems(child_id: string) {
  return useQuery<PreAssessmentResponse, Error>({
    queryKey: ['preAssessmentItems', child_id],
    queryFn: () => getPreAssessmentItems(child_id),
    enabled: Boolean(child_id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
}

export function useSoundMastery(child_id: string) {
  return useQuery<SoundMastery[], Error>({
    queryKey: ['soundMastery', child_id],
    queryFn: () => getSoundMastery(child_id),
    enabled: Boolean(child_id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
}
/**
 * React-Query mutation for creating a Sound Practice assessment
 * @param child_id - the child’s UUID
 */
export function usePracticeSound(child_id: string) {
  return useMutation<SoundPracticeResponse, Error, PracticeSoundVariables>({
    mutationFn: (vars) => createSoundPractice(child_id, vars),
  });
}
/**
 * React-Query mutation for Create Dynamic Fsrs Assessment
 * @param child_id – the child’s UUID
 */
export function useCustomAssessment(child_id: string) {
  return useMutation<CustomAssessmentResponse, Error, CustomAssessmentVariables>({
    mutationFn: (vars) => createCustomAssessment(child_id, vars),
    // you can also add onSuccess, onError, etc. here
  })
}
/**
 * Args for submitAttempt:
 *  - query: the URL‐query params (child_id, assessment_item_id, attempt_type)
 *  - payload: the multipart body (file)
 */
export interface SubmitAttemptArgs {
  query: Pick<AttemptV2Variables, 'child_id' | 'assessment_item_id' | 'attempt_type'>;
  payload: { file: File };
}

/**
 * React‐Query mutation for Attempt V2, using { query, payload } signature
 */
export function useSubmitAttempt() {
  return useMutation<AttemptV2Response, Error, SubmitAttemptArgs>({
    mutationFn: ({ query, payload }) =>
      attemptV2({
        ...query,
        file: payload.file,
      }),
  });
}
