import { ToolsContextType, useToolsContext } from '@renderer/context/useToolsContext'

const alias = 'renameTranslationInput'

interface ToolType {
  idLiteralToRename: string
}

export const useRenameTranslationInput = (): ToolsContextType<ToolType> => {
  return useToolsContext<ToolType>(alias)
}
