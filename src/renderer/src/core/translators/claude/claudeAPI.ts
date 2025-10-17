import { request } from '@renderer/controllers/nativeController'
import { TMConfiguration, TranslationModule } from '@renderer/core/domain'
import { getRequiredConfigValue, getConfigValue } from '@renderer/core/project/configurations'

interface ClaudeMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ClaudeRequest {
  model: string
  max_tokens: number
  messages: ClaudeMessage[]
}

interface ClaudeResponse {
  content: Array<{
    type: string
    text: string
  }>
}

export const claudeAPI: TranslationModule = {
  id: 'claude',
  name: 'Claude API',
  initials: 'CL',
  color: '#CC785C',
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
      'It is necessary to configure the API key to use Claude'
    )
    const model = getConfigValue(configuration, 'model', 'claude-3-haiku-20240307')

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
        zh: 'Chinese'
      }
      const langCode = langId.split('-')[0].toLowerCase()
      return langMap[langCode] || langCode
    }

    const originLang = getLanguageName(id_language_origin)
    const targetLang = getLanguageName(id_language_target)

    const prompt = `Translate the following text from ${originLang} to ${targetLang}. Return only the translated text, without any explanations or additional content:\n\n"${text}"`

    const requestData: ClaudeRequest = {
      model: model,
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    }

    const config = {
      method: 'post',
      url: 'https://api.anthropic.com/v1/messages',
      data: requestData,
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      }
    }

    try {
      const response: ClaudeResponse = await request<ClaudeResponse>(config)

      if (response.content && response.content.length > 0) {
        return response.content[0].text.trim()
      } else {
        throw new Error('No translation received from Claude API')
      }
    } catch (error) {
      throw new Error(
        `Claude API translation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }
}
