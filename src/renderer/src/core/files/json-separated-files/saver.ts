import { writeFile } from '@renderer/controllers/nativeController'
import { FMSaver, LanguageFile, LanguageLoaded } from '@renderer/core/domain'

export const jsonSeparatedFilesSaver: FMSaver = async (
  lfiles: LanguageFile[],
  languagesLoaded: LanguageLoaded[]
) => {
  let allSaved = true
  languagesLoaded.forEach((langl) => {
    const fileTarget = lfiles.find((file) => file.language_id === langl.language_id)
    console.log('Find: ' + langl.language_id, fileTarget)
    console.log('Save in: ' + fileTarget?.language_file, langl.info)
    if (fileTarget) {
      writeFile(fileTarget.language_file, JSON.stringify(langl.info, null, 2))
    } else {
      allSaved = false
    }
  })

  return allSaved
}
