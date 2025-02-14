import { defaultLanguage } from '@renderer/config/languages'
import { FormatModule, LanguageFile, Project, TranslationInfo } from '@renderer/core/domain'
import { getLoader } from '@renderer/core/files/loaderFactory'
import { addLiteralToTranslationInfo } from '@renderer/core/literals/literals_translations'

export const loadLiteralsToProject = async (
  lfiles: LanguageFile[],
  project: Project
): Promise<TranslationInfo> => {
  const fmodule: FormatModule = getLoader(project.files_format)
  const filesInfo = await fmodule.loader(lfiles)

  const included_language_ids = filesInfo.map((finfo) => finfo.language_id)

  const tinfo: TranslationInfo = {
    literals: [],
    included_language_ids,
    default_language_id: defaultLanguage
  }

  filesInfo.forEach((loadedFile) => {
    console.log(loadedFile.language_id)
    Object.keys(loadedFile.info).forEach((lit_key) => {
      const lit_value = loadedFile.info[lit_key]
      console.log('   ' + lit_key + ' -> ' + lit_value)
      addLiteralToTranslationInfo(tinfo, loadedFile.language_id, lit_key, lit_value, false)
    })
  })

  console.log('tinfo', tinfo)

  return tinfo
}
