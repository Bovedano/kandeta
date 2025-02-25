import { readFile, selectFile } from '@renderer/controllers/nativeController'
import { Project } from '@renderer/core/domain'
import { loadLanguageFilesToProject } from '@renderer/core/project/loadFilesToProject'

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

const readFileProject = async (file: string): Promise<Project> => {
  const content = await readFile(file)

  const project: Project = JSON.parse(content)

  const loadedProject = await loadLanguageFilesToProject(project.files, project)
  loadedProject.file = file
  loadedProject.status = {
    saved: true
  }

  return loadedProject
}
