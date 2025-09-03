import { TranslationModule } from '@renderer/core/domain'
import { claudeAPI } from '@renderer/core/translators/claude/claudeAPI'
import { deepLTM } from '@renderer/core/translators/freeGoogle/deepLTM'
import { freeGoogleTM } from '@renderer/core/translators/freeGoogle/freeGoogle'

export const modules: TranslationModule[] = [claudeAPI, deepLTM, freeGoogleTM]

export const getTranslationModule = (id: string): TranslationModule | void => {
  return modules.find((module) => module.id === id)
}
