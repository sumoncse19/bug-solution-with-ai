import express from 'express'
import { SolutionControllers } from './solution.controller'

const router = express.Router()

router.post('/gpt', SolutionControllers.gptSolution)
router.post('/gemini-text', SolutionControllers.geminiTextSolution)
router.post('/gemini-image', SolutionControllers.geminiImageSolution)

export const SolutionRoutes = router
