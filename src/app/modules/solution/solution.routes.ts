import express from 'express'
import { SolutionControllers } from './solution.controller'

const router = express.Router()

router.post('/gpt', SolutionControllers.gptSolution)
router.post('/gemini-text', SolutionControllers.geminiTextSolution)
router.get('/gemini-text', SolutionControllers.getGeminiTextSolutions)
router.post('/gemini-image', SolutionControllers.geminiImageSolution)
router.get('/gemini-image', SolutionControllers.getGeminiImageSolutions)

export const SolutionRoutes = router
