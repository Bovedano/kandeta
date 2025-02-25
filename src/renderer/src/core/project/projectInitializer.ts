import { defaultLanguage } from '@renderer/config/languages'
import { Project, TranslationInfo } from '@renderer/core/domain'

export const getEmptyProject = (): Project => {
  const pj: Project = {
    translation_info: getEmptyTranslationInfo(),
    files_format: 'json-separated-files',
    files: [],
    file: undefined,
    status: {
      saved: true
    },
    tm_configuration: {
      tm_configurations: [],
      selected_tm: ''
    }
  }

  return pj
}

export const getEmptyTranslationInfo = (): TranslationInfo => {
  return {
    default_language_id: defaultLanguage,
    literals: [],
    included_language_ids: []
  }
}
