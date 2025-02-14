import { useToolLanguageConfig } from '@renderer/Tools/hooks/useToolLanguageConfig'
import { LanguageConfig } from '@renderer/Tools/LanguageConfig/LanguageConfig'

export const GlobalToolsRegister = (): JSX.Element => {
  const languageConfigController = useToolLanguageConfig()

  return (
    <>
      <LanguageConfig
        isOpen={languageConfigController.isOpen}
        onClose={languageConfigController.close}
        filesErrors={languageConfigController.data?.filesErrors}
      />
    </>
  )
}
