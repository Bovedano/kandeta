import { readFile, selectFile } from '@renderer/controllers/nativeController'
import { PersistenceProject, Project } from '@renderer/core/domain'
import { loadLanguageFilesToProject } from '@renderer/core/project/loadFilesToProject'
import { getEmptyProject } from '@renderer/core/project/projectInitializer'

export const loadProjectFromFile = async (): Promise<Project> => {
  const file = await selectFile()
  return await readFileProject(file)
}

export const reLoadProject = async (project: Project): Promise<Project> => {
  if (!project.file) {
    throw new Error('The file was not found')
  }
  return await readFileProject(project.file)
}

export const readFileProject = async (file: string): Promise<Project> => {
  const content = await readFile(file)

  const savedProject: PersistenceProject = JSON.parse(content)

  const emptyProject = getEmptyProject()

  const project: Project = {
    ...emptyProject,
    files: savedProject.files,
    files_format: savedProject.files_format
  }

  const loadedProject = await loadLanguageFilesToProject(
    savedProject.default_language_id,
    project.files,
    project
  )
  console.log('project load', loadedProject)
  loadedProject.file = file
  loadedProject.status = {
    saved: true
  }

  return loadedProject
}
