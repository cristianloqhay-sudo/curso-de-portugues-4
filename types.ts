export interface VocabItem {
  pt: string;
  pron: string;
  es: string;
  context: string;
  frasePt?: string;
  fraseEs?: string;
  frasePron?: string;
  color?: string;
  text?: string; // 'white' | 'black'
  border?: boolean;
  icon?: string;
}

export interface Category {
  title: string;
  desc: string;
  items: VocabItem[];
}

export interface DataMap {
  [key: string]: Category;
}

export interface QuizQuestion {
  question: string;
  correctAnswer: string;
  options: string[];
}
