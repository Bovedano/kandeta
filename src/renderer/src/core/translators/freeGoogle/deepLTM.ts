import { request } from '@renderer/controllers/nativeController'
import { TMConfiguration, TranslationModule } from '@renderer/core/domain'
import { getRequiredConfigValue } from '@renderer/core/project/configurations'

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
    const apiKey = getRequiredConfigValue(
      configuration,
      'apiKey',
      'It is necessary to configure the api key to use DeepL'
    )

    const lt = id_language_target.split('-')[0]

    if (!lt) {
      throw new Error('Language not supported by DeepL')
    }

    const url = 'https://api-free.deepl.com/v2/translate'

    const config = {
      method: 'post',
      url: url,
      data: {
        text: [text],
        target_lang: lt.toUpperCase()
      },
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }

    const data: ServiceResponse = await request<ServiceResponse>(config)
    return data.translations[0].text
  }
}
