import { Literal, Project } from '@renderer/core/domain'

export const findLiteralInProjectById = (id: string, project: Project): Literal | undefined => {
  if (project.translation_info?.literals) {
    return project.translation_info.literals.find((lit) => lit.id === id)
  }
}
