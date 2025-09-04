import { ToolsContextType, useToolsContext } from '@renderer/context/useToolsContext'

const alias = 'newTranslationInput'

interface NewTranslationData {
  initialValue?: string
}

export const useNewTranslationInput = (): ToolsContextType<NewTranslationData> => {
  return useToolsContext<NewTranslationData>(alias)
}
