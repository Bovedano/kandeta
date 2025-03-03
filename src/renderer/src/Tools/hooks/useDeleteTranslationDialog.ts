import { ToolsContextType, useToolsContext } from '@renderer/context/useToolsContext'

const alias = 'deleteTranslationDialog'

interface ToolType {
  idLiteralToDelete: string
}

export const useDeleteTranslationDialog = (): ToolsContextType<ToolType> => {
  return useToolsContext<ToolType>(alias)
}
