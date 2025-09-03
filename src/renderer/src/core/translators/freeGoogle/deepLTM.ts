import { request } from '@renderer/controllers/nativeController'
import { TMConfiguration, TranslationModule } from '@renderer/core/domain'

interface ServiceResponse {
  translations: Array<{
    text: string
  }>
}

export const deepLTM: TranslationModule = {
  id: 'deepl',
  name: 'Free DeepL',
  config: [
    {
      id: 'apiKey',
      name: 'Api key'
    }
  ],
  translate: async (
    configuration: TMConfiguration[],
    _id_language_origin: string,
    id_language_target: string,
    text
  ) => {
    const apiKeyC = configuration.find((c) => c.id === 'apiKey') || ''
    console.log('apiKeyC', apiKeyC)

    if (!apiKeyC || !apiKeyC.value) {
      throw new Error('It is necessary to configure the api key to use DeepL')
    }

    const lt = id_language_target.split('-')[0]

    if (!lt) {
      throw new Error('Language not supported by DeepL')
    }

    const url = 'https://api-free.deepl.com/v2/translate'

    const config = {
      method: 'post', // método (POST, GET, etc.)
      url: url, // URL de destino
      data: {
        text: [text], // DeepL permite enviar múltiples textos en un array
        target_lang: lt.toUpperCase() // Idioma de salida (ej. "ES")
      },
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKeyC.value}`,
        'Content-Type': 'application/json'
      }
    }

    const data: ServiceResponse = await request<ServiceResponse>(config)
    return data.translations[0].text
  }
}
