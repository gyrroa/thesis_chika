export interface Word {
  id: number;
  text: string;
  stress: string;
  syllables: string;
  transalation: string;
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