// Question-related types

export interface Question {
  id: string;
  question: string;
  category: string;
  subcategory: string;
  required: boolean;
  helpText?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QuestionResponse {
  questionId: string;
  response: string;
  confidence: number;
  citations: string[];
  processingTime: number;
  createdAt?: Date;
  updatedAt?: Date;
}
