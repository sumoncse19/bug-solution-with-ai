/* eslint-disable @typescript-eslint/no-explicit-any */
import OpenAI from 'openai'
import config from '../../config'
import { GoogleGenerativeAI } from '@google/generative-ai'
import * as fs from 'fs'

const gptSolutionService = async (queryData: { prompt: string }) => {
  try {
    const openai = new OpenAI({
      apiKey: config.chat_gpt_api_key,
    })

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Changed to cheaper model
      messages: [{ role: 'user', content: queryData.prompt }],
      max_tokens: 500, // Add limit to control costs
    })

    if (!response.choices?.[0]?.message) {
      throw new Error('No response from OpenAI')
    }

    return response.choices[0].message
  } catch (err: any) {
    if (err?.response?.status === 429) {
      throw new Error(
        'OpenAI API quota exceeded. Please check your billing details.',
      )
    }
    throw new Error(`OpenAI API Error: ${err.message}`)
  }
}

const geminiTextSolutionService = async (queryData: { prompt: string }) => {
  try {
    const genAI = new GoogleGenerativeAI(`${config.gemini_api_key}`)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const prompt = queryData.prompt

    const result = await model.generateContent(prompt)

    if (!result.response.text()) {
      throw new Error('No response from OpenAI')
    }

    return result.response.text()
  } catch (err: any) {
    if (err?.response?.status === 429) {
      throw new Error(
        'OpenAI API quota exceeded. Please check your billing details.',
      )
    }
    throw new Error(`OpenAI API Error: ${err.message}`)
  }
}

interface ImageQueryData {
  prompt: string
  imageFile: {
    buffer?: Buffer
    path?: string
    mimetype?: string
  } | null
}

const geminiImageSolutionService = async (queryData: ImageQueryData) => {
  try {
    if (!queryData.imageFile) {
      throw new Error('No image file provided')
    }

    const genAI = new GoogleGenerativeAI(`${config.gemini_api_key}`)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    let imageData: Buffer
    if (queryData.imageFile.buffer) {
      imageData = queryData.imageFile.buffer
    } else if (queryData.imageFile.path) {
      imageData = fs.readFileSync(queryData.imageFile.path)
    } else {
      throw new Error('Invalid image file format')
    }

    const image = {
      inlineData: {
        data: imageData.toString('base64'), // or ideally, avoid base64
        mimeType: queryData.imageFile.mimetype || 'image/jpeg', // Consider better mimetype handling
      },
    }

    const result = await model.generateContent([queryData.prompt, image])
    const response = result.response

    if (!response) {
      throw new Error('No response from Gemini API')
    }

    const text = response.text()

    if (!text) {
      throw new Error('No text content in the Gemini response')
    }

    return {
      role: 'assistant',
      content: text,
    }
  } catch (err: any) {
    console.error('Gemini Image Service Error:', err)
    throw new Error(`Gemini API Error: ${err.message}`) // Using err. Message
  }
}

export const SolutionServices = {
  gptSolutionService,
  geminiTextSolutionService,
  geminiImageSolutionService,
}
