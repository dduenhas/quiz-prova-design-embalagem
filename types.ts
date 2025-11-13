
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  chapter: number;
}

export interface UserAnswer {
  questionId: number;
  selectedAnswerIndex: number;
}

export enum QuizState {
  Start,
  InProgress,
  Finished,
}
