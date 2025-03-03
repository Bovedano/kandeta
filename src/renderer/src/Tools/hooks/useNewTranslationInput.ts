import { ToolsContextType, useToolsContext } from '@renderer/context/useToolsContext'

const alias = 'newTranslationInput'

export const useNewTranslationInput = (): ToolsContextType<void> => {
  return useToolsContext<void>(alias)
}
