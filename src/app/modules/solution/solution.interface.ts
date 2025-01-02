/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITextSolution {
  prompt: string
  feedbackType: string
  solution?: string
}

export interface IImageSolution {
  prompt: string
  imageFile: {
    buffer?: Buffer
    path?: string
    mimetype?: string
  } | null
  originalImage: any
  feedbackType: string
  solution?: string
}
