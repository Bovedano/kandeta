import { selectNewFile, writeFile } from '@renderer/controllers/nativeController'
import { FormatModule, LanguageLoaded, PersistenceProject, Project } from '@renderer/core/domain'
import { getLoader } from '@renderer/core/files/loaderFactory'
import { getLanguageOrderedTranslations } from '@renderer/core/literals/literals_translations'

export const saveProject = async (project: Project, forceSelect: boolean): Promise<Project> => {
  if (project.file && !forceSelect) {
    const serializedProject = serializeProject(project)
    writeFile(project.file, serializedProject)

    saveLanguageFiles(project)

    return project
  } else {
    const serializedProject = serializeProject(project)

    const file = await selectNewFile('translations.knt', serializedProject)

    const updatedProject: Project = {
      ...project,
      file: file,
      status: {
        saved: true
      }
    }

    saveLanguageFiles(project)

    return updatedProject
  }
}

export const saveLanguageFiles = async (project: Project): Promise<boolean> => {
  const languageFiles = await projectToLanguageLoaded(project)

  const fmodule: FormatModule = getLoader(project.files_format)

  fmodule.saver(project.files, languageFiles)

  console.log(languageFiles)
  return true
}

const serializeProject = (project: Project): string => {
  const projectToSave: PersistenceProject = {
    default_language_id: project.translation_info.default_language_id,
    files: project.files,
    files_format: project.files_format
  }

  return JSON.stringify(projectToSave)
}

export const projectToLanguageLoaded = async (project: Project): Promise<LanguageLoaded[]> => {
  const lfiles: LanguageLoaded[] = []

  const orderedTranslations = getLanguageOrderedTranslations(project.translation_info)
  console.log('orderedTranslations', orderedTranslations)

  orderedTranslations.forEach((otrans) => {
    const file = project.files.find((file) => file.language_id === otrans.language_id)
    if (file) {
      lfiles.push({
        info: otrans.translations.reduce<Record<string, string>>((acc, ot) => {
          acc[ot.literal.id] = ot.translation.text
          return acc
        }, {}),
        language_id: otrans.language_id
      })
    }
  })

  console.log('lfiles', lfiles)

  return lfiles
}
