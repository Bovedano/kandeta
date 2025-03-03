import { FormatModule, LanguageFile, Project, TranslationInfo } from '@renderer/core/domain'
import { getLoader } from '@renderer/core/files/loaderFactory'
import { addLiteralToTranslationInfo } from '@renderer/core/literals/literals'

export const loadLiteralsToProject = async (
  lfiles: LanguageFile[],
  project: Project
): Promise<TranslationInfo> => {
  const fmodule: FormatModule = getLoader(project.files_format)
  const filesInfo = await fmodule.loader(lfiles)

  //Add files literals
  filesInfo.forEach((loadedFile) => {
    console.log(loadedFile.language_id)
    Object.keys(loadedFile.info).forEach((lit_key) => {
      const lit_value = loadedFile.info[lit_key]
      console.log('   ' + lit_key + ' -> ' + lit_value)
      addLiteralToTranslationInfo(
        project.translation_info,
        loadedFile.language_id,
        lit_key,
        lit_value,
        false
      )
    })
  })

  //Add actual project literals
  project.translation_info.literals.forEach((lit) => {
    lit.translations.forEach((translation) => {
      addLiteralToTranslationInfo(
        project.translation_info,
        translation.language_id,
        lit.id,
        translation.text,
        false
      )
    })
  })

  return project.translation_info
}
