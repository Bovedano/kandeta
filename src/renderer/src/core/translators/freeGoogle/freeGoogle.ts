import { TranslationModule } from '@renderer/core/domain'

/*
interface ServiceResponse {
  translations: Array<{
    text: string
  }>
}
*/
export const freeGoogleTM: TranslationModule = {
  id: 'freegoogle',
  name: 'Free Google',
  config: [],
  translate: async () =>
    /*
    configuration: TMConfiguration[],
    id_language_origin: string,
    id_language_target: string,
    text
    */
    {
      throw new Error('Not implemented yet')
    }
}
