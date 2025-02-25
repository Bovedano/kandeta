import { ToolsContextType, useToolsContext } from '@renderer/context/useToolsContext'

const alias = 'renameTranslationInput'

interface ToolType {
  idLiteralToDuplicate: string
}

export const useDuplicateTranslationInput = (): ToolsContextType<ToolType> => {
  return useToolsContext<ToolType>(alias)
}
