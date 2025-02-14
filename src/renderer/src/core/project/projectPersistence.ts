import {
  readFile,
  selectFile,
  selectNewFile,
  writeFile
} from '@renderer/controllers/nativeController'
import { Project } from '@renderer/core/domain'
import { loadLanguageFilesToProject } from '@renderer/core/project/loadFilesToProject'

export const saveProject = async (project: Project): Promise<Project> => {
  if (project.file) {
    const serializedProject = serializeProject(project)
    writeFile(project.file, serializedProject)
    return project
  } else {
    const serializedProject = serializeProject(project)

    const file = await selectNewFile('translations.knt', serializedProject)

    const updatedProject: Project = {
      ...project,
      file: file
    }

    console.log('save content', serializedProject)

    return updatedProject
  }
}

export const loadProject = async (): Promise<Project> => {
  const file = await selectFile()
  const content = await readFile(file)

  const project: Project = JSON.parse(content)

  const loadedProject = await loadLanguageFilesToProject(project.files, project)
  loadedProject.file = file
  return loadedProject
}

const serializeProject = (project: Project): string => {
  const projectToSave: Project = {
    ...project,
    file: undefined,
    translation_info: undefined
  }

  return JSON.stringify(projectToSave)
}
