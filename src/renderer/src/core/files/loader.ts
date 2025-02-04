import { readFile } from '@renderer/controllers/nativeController'
import { LanguageFile } from '@renderer/core/domain'
import { FileLoadError } from '@renderer/core/models'

export const checkAndLoadFile = async (lfile: LanguageFile): Promise<Record<string, string>> => {
  const fileContent = await readFile(lfile.language_file)
  const jsonFile = JSON.parse(fileContent)
  return jsonFile
}

export const checkAndLoadFiles = async (
  lfiles: LanguageFile[]
): Promise<Record<string, string>[]> => {
  const filteredLF = filterFiles(lfiles)

  const results = await Promise.allSettled(filteredLF.map(checkAndLoadFile))

  const success: Record<string, string>[] = []
  const failed: string[] = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      success.push(result.value)
    } else {
      failed.push(filteredLF[index].language_id)
    }
  })

  if (failed.length > 0) {
    throw new FileLoadError(failed)
  }

  return success
}

const filterFiles = (lfiles: LanguageFile[]): LanguageFile[] => {
  return lfiles.filter((lfile) => !!lfile.language_file)
}

/*
export const loadLiterals = (lfiles: LanguageFile[]): Literal[] => {
  const literals: Literal[] = []

  return literals
}
*/
