import { LanguageFile, Project } from '@renderer/core/domain'
import { loadLiteralsToProject } from '@renderer/core/literals/language_to_project_loader'

export const loadLanguageFilesToProject = async (
  default_language_id: string,
  lfiles: LanguageFile[],
  project: Project
): Promise<Project> => {
  const translation_info = await loadLiteralsToProject(lfiles, project)
  const updated_project = {
    ...project,
    files: lfiles,
    translation_info: {
      ...translation_info,
      default_language_id: default_language_id
    }
  }

  return updated_project
}
