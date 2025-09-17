// Comprehensive demo data for middleware functionality
import { climateQuestions1 } from './climateQuestions1';
import { climateQuestions2 } from './climateQuestions2';
import { climateAnswers1 } from './climateAnswers1';
import { climateAnswers2 } from './climateAnswers2';

// Combine all questions and answers
export const climateQuestions = [...climateQuestions1, ...climateQuestions2];
export const climateAnswers = [...climateAnswers1, ...climateAnswers2];

// Demo data for testing
export const demoUsers = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
  },
];

export const demoOrganizations = [
  {
    id: 'org1',
    name: 'Green Energy Corp',
    type: 'corporation',
    industry: 'renewable energy',
  },
  {
    id: 'org2',
    name: 'Sustainable Solutions Inc',
    type: 'corporation',
    industry: 'environmental services',
  },
];
