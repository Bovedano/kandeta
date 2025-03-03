import { readFile } from '@renderer/controllers/nativeController'
import { FMLoader, LanguageFile, LanguageLoaded } from '@renderer/core/domain'
import { FileLoadError } from '@renderer/core/models'

export const jsonSeparatedFilesLoader: FMLoader = async (
  lfiles: LanguageFile[]
): Promise<LanguageLoaded[]> => {
  const filteredLF = filterFiles(lfiles)

  const results = await Promise.allSettled(filteredLF.map(checkAndLoadFile))

  const success: LanguageLoaded[] = []
  const failed: string[] = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      success.push({
        language_id: filteredLF[index].language_id,
        info: result.value
      })
    } else {
      failed.push(filteredLF[index].language_id)
    }
  })

  if (failed.length > 0) {
    throw new FileLoadError(failed)
  }

  return success
}

const checkAndLoadFile = async (lfile: LanguageFile): Promise<Record<string, string>> => {
  const fileContent = await readFile(lfile.language_file)
  const jsonFile = JSON.parse(fileContent)
  return jsonFile
}

const filterFiles = (lfiles: LanguageFile[]): LanguageFile[] => {
  return lfiles.filter((lfile) => !!lfile.language_file)
}
