import { Router, type Router as ExpressRouter } from 'express';
import { getQuestions, getQuestionById, submitQuestion } from '../controllers/questionController';

// eslint-disable-next-line new-cap
const router: ExpressRouter = Router();

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Get all questions with answers, citations, and explanations
 *     description: Retrieve all climate-related questions with their answers, citations, and explanations
 *     tags:
 *       - Questions
 *     responses:
 *       200:
 *         description: Questions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       question:
 *                         type: string
 *                         example: "What are the climate-related risks and opportunities identified in your annual report?"
 *                       answer:
 *                         type: string
 *                         example: "Green Energy Corp has identified comprehensive climate-related risks..."
 *                       citation:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Annual Report 2023, Page 45, Section 4.2"]
 *                       explanation:
 *                         type: string
 *                         example: "Include both physical risks (extreme weather, sea level rise) and transition risks..."
 *                 count:
 *                   type: number
 *                   example: 35
 *       500:
 *         description: Internal server error
 */
router.get('/', getQuestions);

/**
 * @swagger
 * /api/questions/{id}:
 *   get:
 *     summary: Get a specific question by ID with answer, citation, and explanation
 *     description: Retrieve a single question with its answer, citations, and explanation by ID
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *         example: "q1"
 *     responses:
 *       200:
 *         description: Question retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                       example: "What are the climate-related risks and opportunities identified in your annual report?"
 *                     answer:
 *                       type: string
 *                       example: "Green Energy Corp has identified comprehensive climate-related risks..."
 *                     citation:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Annual Report 2023, Page 45, Section 4.2"]
 *                     explanation:
 *                       type: string
 *                       example: "Include both physical risks (extreme weather, sea level rise) and transition risks..."
 *       404:
 *         description: Question not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getQuestionById);

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Submit a new question
 *     description: Submit a new climate-related question for processing
 *     tags:
 *       - Questions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *                 description: The climate-related question to submit
 *                 example: "How does climate change affect our supply chain operations?"
 *               explanation:
 *                 type: string
 *                 description: Optional explanation or context for the question
 *                 example: "We want to understand climate risks in our global supply chain"
 *     responses:
 *       201:
 *         description: Question submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Question submitted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "q36"
 *                     question:
 *                       type: string
 *                       example: "How does climate change affect our supply chain operations?"
 *                     explanation:
 *                       type: string
 *                       example: "We want to understand climate risks in our global supply chain"
 *                     submittedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T10:30:00.000Z"
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post('/', submitQuestion);

export default router;
