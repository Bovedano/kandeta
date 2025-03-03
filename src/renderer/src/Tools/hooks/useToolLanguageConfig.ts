import { ToolsContextType, useToolsContext } from '@renderer/context/useToolsContext'

const alias = 'languageConfig'

interface ToolType {
  filesErrors: string[]
}

export const useToolLanguageConfig = (): ToolsContextType<ToolType> => {
  return useToolsContext<ToolType>(alias)
}
