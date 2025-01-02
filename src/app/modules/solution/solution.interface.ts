export interface ITextSolution {
  prompt: string
  feedbackType: string
  solution: string
}

export interface IImageSolution {
  prompt: string
  imageFile: {
    buffer?: Buffer
    path?: string
    mimetype?: string
  } | null
  feedbackType: string
  solution: string
}
