import type { Request, Response } from 'express';
import { climateQuestions, climateAnswers } from '../data/demoData';
import logger from '../utils/logger';

/**
 * Get all questions with answers, citations, and explanations
 */
export const getQuestions = (req: Request, res: Response): void => {
  try {
    // Combine questions with their answers
    const questionsWithAnswers = climateQuestions.map(question => {
      const answer = climateAnswers.find(a => a.questionId === question.id);
      
      return {
        question: question.question,
        answer: answer?.response || 'No answer available',
        citation: answer?.citations || [],
        explanation: question.helpText || 'No explanation available'
      };
    });

    logger.info(`Retrieved ${questionsWithAnswers.length} questions with answers`);

    res.json({
      success: true,
      data: questionsWithAnswers,
      count: questionsWithAnswers.length
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
    const question = climateQuestions.find(q => q.id === id);

    if (!question) {
      logger.warn(`Question not found: ${id}`);
      res.status(404).json({
        success: false,
        error: 'Question not found',
        message: `No question found with ID: ${id}`,
      });
      return;
    }

    // Find the corresponding answer
    const answer = climateAnswers.find(a => a.questionId === id);

    const questionWithAnswer = {
      question: question.question,
      answer: answer?.response || 'No answer available',
      citation: answer?.citations || [],
      explanation: question.helpText || 'No explanation available'
    };

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

    // Validate required fields
    if (!question || typeof question !== 'string' || question.trim() === '') {
      res.status(400).json({
        success: false,
        error: 'Validation error',
        message: 'Question is required and must be a non-empty string',
      });
      return;
    }

    // Generate a new question ID
    const newId = `q${climateQuestions.length + 1}`;

    // Create the new question object
    const newQuestion = {
      id: newId,
      question: question.trim(),
      explanation: explanation?.trim() || 'No explanation provided',
      submittedAt: new Date().toISOString(),
    };

    logger.info(`New question submitted: ${newId}`);

    res.status(201).json({
      success: true,
      message: 'Question submitted successfully',
      data: {
        id: newQuestion.id,
        question: newQuestion.question,
        explanation: newQuestion.explanation,
        submittedAt: newQuestion.submittedAt,
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
