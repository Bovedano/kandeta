import { TranslationModule } from '@renderer/core/domain'
import { deepLTM } from '@renderer/core/translators/freeGoogle/deepLTM'
import { freeGoogleTM } from '@renderer/core/translators/freeGoogle/freeGoogle'

export const modules: TranslationModule[] = [freeGoogleTM, deepLTM]

export const getTranslationModule = (id: string): TranslationModule | void => {
  return modules.find((module) => module.id === id)
}
