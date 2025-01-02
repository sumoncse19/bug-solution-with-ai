/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import httpStatus from 'http-status'
import { SUCCESS } from '../shared/api.response.types'
import { SolutionServices } from './solution.service'
import multer from 'multer'

const gptSolution = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SolutionServices.gptSolutionService(req.body)

    return SUCCESS(res, httpStatus.OK, 'Get solution successfully', result)
  },
  httpStatus.INTERNAL_SERVER_ERROR,
  'Failed to get solution try again',
)

const geminiTextSolution = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SolutionServices.geminiTextSolutionService(req.body)

    return SUCCESS(res, httpStatus.OK, 'Get solution successfully', result)
  },
  httpStatus.INTERNAL_SERVER_ERROR,
  'Failed to get solution try again',
)

const getGeminiTextSolutions = catchAsync(
  async (req: Request, res: Response) => {
    const { page = '1', limit = '10' } = req.query

    const pageNum = parseInt(page as string, 10)
    const limitNum = parseInt(limit as string, 10)

    const geminiTextSolutions =
      await SolutionServices.getGeminiTextSolutionServiceFromDB(
        pageNum,
        limitNum,
      )

    return SUCCESS(
      res,
      httpStatus.OK,
      'Get gemini text solutions successfully',
      geminiTextSolutions,
    )
  },
)

const geminiImageSolution = catchAsync(
  async (req: Request, res: Response) => {
    const upload = multer({ storage: multer.memoryStorage() })

    upload.single('imageFile')(req, res, async (err: any) => {
      if (err) {
        throw err
      }
      const queryData = {
        prompt: req.body.prompt || 'Tell me about this image.',
        imageFile: req.file
          ? {
              buffer: req.file.buffer,
              mimetype: req.file.mimetype,
            }
          : null,
        originalImage: req.file,
        feedbackType: req.body.feedbackType || '',
      }

      const result =
        await SolutionServices.geminiImageSolutionService(queryData)

      return SUCCESS(res, httpStatus.OK, 'Get solution successfully', result)
    })
  },
  httpStatus.INTERNAL_SERVER_ERROR,
  'Failed to get solution try again',
)

const getGeminiImageSolutions = catchAsync(
  async (req: Request, res: Response) => {
    const { page = '1', limit = '10' } = req.query

    const pageNum = parseInt(page as string, 10)
    const limitNum = parseInt(limit as string, 10)

    const geminiImageSolutions =
      await SolutionServices.getGeminiImageSolutionServiceFromDB(
        pageNum,
        limitNum,
      )

    return SUCCESS(
      res,
      httpStatus.OK,
      'Get gemini image solutions successfully',
      geminiImageSolutions,
    )
  },
)

export const SolutionControllers = {
  gptSolution,
  geminiTextSolution,
  getGeminiTextSolutions,
  geminiImageSolution,
  getGeminiImageSolutions,
}
