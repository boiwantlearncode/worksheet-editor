export interface OptionType {
  index: number;
  identifier: string;
  content: string;
}

export interface QuestionType {
  id: string;
  index: string,
  question: string;
  questionType: string;
  options: OptionType[] | null;
}

export interface TagProps {
  questionType: string;
  currentSelectedQuestionTag: string;
}