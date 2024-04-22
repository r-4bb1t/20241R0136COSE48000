export interface CourseType {
  id?: string;

  title: string;
  content: string;
  summary?: string;

  department: string;
  category: string;

  questions: QuestionType[];
}

export interface QuestionType {
  question: string;
  type: string;
  choices?: string[];
  answer: string;
  reason: string;
}
