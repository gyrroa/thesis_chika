//exercises/types.ts
export interface Word {
  id: number;
  text: string;
  stress: string;
  syllables: string;
  translation: string;
  image_url: string;
  audio_url: string | null;
}

export interface Item {
  item: number;
  word: Word;
  sounds: string[];
}

export interface PreAssessmentResponse {
  items_count: number;
  assessment_name: string;
  items: Item[];
}
export interface SoundMastery {
  sound: string;
  mastery_score: number;
  reps: number;
  lapses: number;
  difficulty: number;
  stability: number;
  reviewed_words: number;
  total_words: number;
}

export interface PracticeSoundVariables {
  sound: string;
  nickname?: string;
  max_items?: number;
}

export interface SoundPracticeResponse {
  assessment_id: number;
  assessment_name: string;
  total_items: number;
  due_items: number;
  items: Array<{
    dynamic_assessment_item_id: number;
    word: {
      text: string;
      stress: string;
      syllables: string;
      translation: string;
      audio_url: string;
      image_url: string;
    };
    is_due: boolean;
    order: number;
  }>;
}
export interface CustomAssessmentVariables {
  difficultry_threshold?: number;
  max_items?: number;
  nickname?: string;
}

export interface CustomAssessmentResponse {
  assessment_id: number;
  assessment_name: string;
  total_items: number;
  due_items: number;
  items: Array<{
    assessment_item_id: number;
    word: {
      text: string;
      stress: string;
      syllables: string;
      translation: string;
      audio_url: string;
      image_url: string;
    };
    sounds: string[];
    difficulty: number;
    due_date: string;    // ISO timestamp
    order: number;
  }>;
}
/**
 * Variables needed to attempt V2.
 */
export interface AttemptV2Variables {
  child_id: string;
  assessment_item_id: number;
  attempt_type: string;
  file: File;
}

/**
 * Shape of the response from POST /exercises/attempt_v2.
 */
export interface AttemptV2Response {
  id: string;
  child_id: string;
  assessment_item_id: number;
  dynamic_assessment_item_id: number | null;
  attempt_answer: string;
  attempt_answer_stressed: string;
  cer: number;
  correct: boolean;
  stress_per_syllable: number[];
  stress_correct: boolean;
  attempt_time: string;       // ISO timestamp
  audio_url: string;
}
