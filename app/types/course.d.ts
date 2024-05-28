export interface CourseType {
  id?: string;

  title: string;
  content: string;
  summary?: string;

  department: string;
  category: string;

  questions: QuestionType[];
  pdf: { title: string; ocr: string; id: string }[];
}

export interface QuestionType {
  id: string;
  question: string;
  answer: string;
  advice: string;
}
