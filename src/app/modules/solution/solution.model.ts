import { model, Schema } from 'mongoose'
import { IImageSolution, ITextSolution } from './solution.interface'

const textSolutionSchema = new Schema<ITextSolution>(
  {
    prompt: { type: String, required: true },
    feedbackType: { type: String, required: true },
    solution: { type: String },
  },
  { timestamps: true },
)

const imageSolutionSchema = new Schema<IImageSolution>(
  {
    prompt: { type: String, required: true },
    imageFile: {
      buffer: { type: Buffer },
      path: { type: String },
      mimetype: { type: String },
    },
    feedbackType: { type: String, required: true },
    originalImage: { type: String },
    solution: { type: String },
  },
  { timestamps: true },
)

export const TextSolutionModel = model<ITextSolution>(
  'TextSolution',
  textSolutionSchema,
)

export const ImageSolutionModel = model<IImageSolution>(
  'ImageSolution',
  imageSolutionSchema,
)
