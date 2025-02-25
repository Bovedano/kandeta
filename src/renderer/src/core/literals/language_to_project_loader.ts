import { defaultLanguage } from '@renderer/config/languages'
import { FormatModule, LanguageFile, Project, TranslationInfo } from '@renderer/core/domain'
import { getLoader } from '@renderer/core/files/loaderFactory'
import { addLiteralToTranslationInfo } from '@renderer/core/literals/literals'

export const loadLiteralsToProject = async (
  lfiles: LanguageFile[],
  project: Project
): Promise<TranslationInfo> => {
  const fmodule: FormatModule = getLoader(project.files_format)
  const filesInfo = await fmodule.loader(lfiles)

  const included_language_ids = filesInfo.map((finfo) => finfo.language_id)

  let tinfo: TranslationInfo | undefined = project.translation_info

  if (!tinfo) {
    tinfo = {
      literals: [],
      included_language_ids,
      default_language_id: defaultLanguage
    }
  }

  //Add files literals
  filesInfo.forEach((loadedFile) => {
    console.log(loadedFile.language_id)
    Object.keys(loadedFile.info).forEach((lit_key) => {
      const lit_value = loadedFile.info[lit_key]
      console.log('   ' + lit_key + ' -> ' + lit_value)
      addLiteralToTranslationInfo(tinfo, loadedFile.language_id, lit_key, lit_value, false)
    })
  })

  //Add actual project literals
  if (project.translation_info) {
    project.translation_info.literals.forEach((lit) => {
      lit.translations.forEach((translation) => {
        addLiteralToTranslationInfo(tinfo, translation.language_id, lit.id, translation.text, false)
      })
    })
  }

  return tinfo
}
