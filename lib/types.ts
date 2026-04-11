// ============================================================
// TYPES
// ============================================================
export interface Topic {
  id: string;
  name: string;
  user_code: string;
  category_name?: string;
  created_at: string;
  vocab_count?: number;
}

export interface Vocabulary {
  id: string;
  topic_id: string;
  word: string;
  ipa: string;
  meanings: string | string[]; // Can be array of strings or string
  notes: string;
  created_at: string;
  review_interval?: number;
  next_review_date?: string;
}

export interface DictSuggestion {
  word: string;
  ipa: string;
  partOfSpeech: string;
  definition: string;
  example?: string;
  audioUrl?: string;
}

export interface AutocompleteWord {
  word: string;
  score: number;
}

export interface LeaderboardUser {
  user_code: string;
  name?: string; // Display name
  count: number;
}

export interface UserProfile {
  user_code: string;
  display_name: string;
  current_streak: number;
  last_learned_at?: string;
}
