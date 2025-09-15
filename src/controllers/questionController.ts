import type { Request, Response } from 'express';
import logger from '../utils/logger';
import { climateAnswers, climateQuestions } from '../data';
import type { Question } from '../types/question';

/**
 * Helper function to combine question with its answer
 */
const combineQuestionWithAnswer = (question: Question) => {
  const answer = climateAnswers.find(a => a.questionId === question.id);
  return {
    question: question.question,
    answer: answer?.response || 'No answer available',
    citation: answer?.citations || [],
    explanation: question.helpText || 'No explanation available',
  };
};

/**
 * Helper function to find question by ID
 */
const findQuestionById = (id: string): Question | undefined => {
  return climateQuestions.find(q => q.id === id);
};

/**
 * Helper function to handle question not found response
 */
const handleQuestionNotFound = (res: Response, id: string): void => {
  logger.warn(`Question not found: ${id}`);
  res.status(404).json({
    success: false,
    error: 'Question not found',
    message: `No question found with ID: ${id}`,
  });
};

/**
 * Helper function to validate question input
 */
const validateQuestionInput = (question: unknown): string | null => {
  if (!question || typeof question !== 'string' || question.trim() === '') {
    return 'Question is required and must be a non-empty string';
  }
  return null;
};

/**
 * Helper function to create new question object
 */
const createNewQuestion = (question: string, explanation?: string): Question => {
  const newId = `q${climateQuestions.length + 1}`;
  const helpText = explanation?.trim() || 'No explanation provided';

  return {
    id: newId,
    question: question.trim(),
    category: 'User Submitted',
    subcategory: 'General',
    required: false,
    helpText: helpText, // Now TypeScript knows this is definitely a string
  };
};

/**
 * Get all questions with answers, citations, and explanations
 */
export const getQuestions = (req: Request, res: Response): void => {
  try {
    const questionsWithAnswers = climateQuestions.map(combineQuestionWithAnswer);

    logger.info(`Retrieved ${questionsWithAnswers.length} questions with answers`);

    res.json({
      success: true,
      data: questionsWithAnswers,
      count: questionsWithAnswers.length,
    });
  } catch (error) {
    logger.error(`Error retrieving questions: ${error}`);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve questions',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Get a specific question by ID with answer, citation, and explanation
 */
export const getQuestionById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const question = findQuestionById(id);

    if (!question) {
      handleQuestionNotFound(res, id);
      return;
    }

    const questionWithAnswer = combineQuestionWithAnswer(question);

    logger.info(`Retrieved question: ${id}`);
    res.json({
      success: true,
      data: questionWithAnswer,
    });
  } catch (error) {
    logger.error(`Error retrieving question ${req.params.id}: ${error}`);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve question',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Submit a new question
 */
export const submitQuestion = (req: Request, res: Response): void => {
  try {
    const { question, explanation } = req.body;

    const validationError = validateQuestionInput(question);
    if (validationError) {
      res.status(400).json({
        success: false,
        error: 'Validation error',
        message: validationError,
      });
      return;
    }

    const newQuestion = createNewQuestion(question, explanation);

    // Type assertion to ensure compatibility
    (climateQuestions as Question[]).push(newQuestion);

    logger.info(`New question submitted: ${newQuestion.id}`);

    res.status(201).json({
      success: true,
      message: 'Question submitted successfully',
      data: {
        id: newQuestion.id,
        question: newQuestion.question,
        explanation: newQuestion.helpText,
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error(`Error submitting question: ${error}`);
    res.status(500).json({
      success: false,
      error: 'Failed to submit question',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
