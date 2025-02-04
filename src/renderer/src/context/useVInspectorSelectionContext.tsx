import { Project } from '@renderer/core/domain'
import React, { useContext, useState } from 'react'

interface ProjectProviderProps {
  children: React.ReactElement | React.ReactElement[]
}

interface ProjectState {
  project: Project
}

interface ProjectContext extends ProjectState {
  setProject: (project: Project) => void
  setAll: (data: ProjectState) => void
}

const defContext: ProjectContext = {
  project: {
    translation_info: {
      default_language_id: 'es-ES',
      literals: []
    },
    files: [],
    file: undefined
  },
  setProject: () => {},
  setAll: () => {}
}

const ctx = React.createContext<ProjectContext>(defContext)

export const ProjectProvider = (props: ProjectProviderProps): JSX.Element => {
  const [data, setData] = useState<ProjectState>(defContext)

  const setProject = (project: Project): void => {
    setData({
      ...data,
      project
    })
  }

  const value = {
    project: data.project,
    setProject,
    setAll: setData
  }

  return <ctx.Provider value={value} {...props} />
}

export const useProjectContext = (): ProjectContext => {
  const contexto = useContext(ctx)

  if (!contexto) {
    throw 'Para utilizar useProjectContext el componente debe estar anidado en el proveedor ProjectProvider'
  }

  return contexto
}
