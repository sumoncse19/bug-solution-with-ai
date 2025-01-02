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

export const SolutionControllers = {
  gptSolution,
  geminiTextSolution,
  geminiImageSolution,
}
