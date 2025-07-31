import { useQuery } from '@tanstack/react-query';
import { getPreAssessmentItems } from './service';
import type { PreAssessmentResponse } from './types';

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