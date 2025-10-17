import { request } from '@renderer/controllers/nativeController'
import { TMConfiguration, TranslationModule } from '@renderer/core/domain'
import { getRequiredConfigValue, getConfigValue } from '@renderer/core/project/configurations'

interface GeminiContent {
  parts: Array<{
    text: string
  }>
}

interface GeminiRequest {
  contents: GeminiContent[]
  generationConfig?: {
    temperature?: number
    topK?: number
    topP?: number
    maxOutputTokens?: number
  }
}

interface GeminiResponse {
  candidates: Array<{
    content: GeminiContent
    finishReason?: string
  }>
}

export const geminiAPI: TranslationModule = {
  id: 'gemini',
  name: 'Google Gemini API',
  initials: 'GM',
  color: '#4285F4',
  config: [
    {
      id: 'apiKey',
      name: 'API Key'
    },
    {
      id: 'model',
      name: 'Model (optional)'
    }
  ],
  translate: async (
    configuration: TMConfiguration[],
    id_language_origin: string,
    id_language_target: string,
    text: string
  ) => {
    const apiKey = getRequiredConfigValue(
      configuration,
      'apiKey',
      'It is necessary to configure the API key to use Gemini'
    )
    const model = getConfigValue(configuration, 'model', 'gemini-2.0-flash')

    // Extract language codes (e.g., 'en-US' -> 'English', 'es-ES' -> 'Spanish')
    const getLanguageName = (langId: string): string => {
      const langMap: Record<string, string> = {
        en: 'English',
        es: 'Spanish',
        fr: 'French',
        de: 'German',
        it: 'Italian',
        pt: 'Portuguese',
        ru: 'Russian',
        ja: 'Japanese',
        ko: 'Korean',
        zh: 'Chinese',
        ar: 'Arabic',
        hi: 'Hindi',
        tr: 'Turkish',
        nl: 'Dutch',
        pl: 'Polish',
        sv: 'Swedish',
        da: 'Danish',
        no: 'Norwegian',
        fi: 'Finnish'
      }
      const langCode = langId.split('-')[0].toLowerCase()
      return langMap[langCode] || langCode
    }

    const originLang = getLanguageName(id_language_origin)
    const targetLang = getLanguageName(id_language_target)

    const prompt = `Translate the following text from ${originLang} to ${targetLang}. Return only the translated text, without any explanations or additional content:\n\n"${text}"`

    const requestData: GeminiRequest = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048
      }
    }

    const config = {
      method: 'post',
      url: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      data: requestData,
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      }
    }

    try {
      const response: GeminiResponse = await request<GeminiResponse>(config)

      if (
        response.candidates &&
        response.candidates.length > 0 &&
        response.candidates[0].content?.parts?.length > 0
      ) {
        return response.candidates[0].content.parts[0].text.trim()
      } else {
        throw new Error('No translation received from Gemini API')
      }
    } catch (error) {
      throw new Error(
        `Gemini API translation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }
}
