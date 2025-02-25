import { ToolsContextType, useToolsContext } from '@renderer/context/useToolsContext'

const alias = 'apiConnectorConfig'

export const useApiConnectorConfig = (): ToolsContextType<void> => {
  return useToolsContext<void>(alias)
}
