import { LanguageFile, Project } from '@renderer/core/domain'
import { loadLiteralsToProject } from '@renderer/core/literals/language_to_project_loader'

export const loadLanguageFilesToProject = async (
  lfiles: LanguageFile[],
  project: Project
): Promise<Project> => {
  const translation_info = await loadLiteralsToProject(lfiles, project)
  const updated_project = {
    ...project,
    files: lfiles,
    translation_info: translation_info
  }

  return updated_project
}
