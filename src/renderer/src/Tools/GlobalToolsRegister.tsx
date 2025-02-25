import { ApiConnectorsConfig } from '@renderer/Tools/ApiConnectorsConfig/ApiConnectorsConfig'
import { DeleteTranslationDialog } from '@renderer/Tools/DeleteTranslationDialog/DeleteTranslationDialog'
import { DuplicateTrasnlationInput } from '@renderer/Tools/DuplicateTrasnlationInput/DuplicateTrasnlationInput'
import { useApiConnectorConfig } from '@renderer/Tools/hooks/useApiConnectorConfig'
import { useDeleteTranslationDialog } from '@renderer/Tools/hooks/useDeleteTranslationDialog'
import { useDuplicateTranslationInput } from '@renderer/Tools/hooks/useDuplicateTranslationInput'
import { useNewTranslationInput } from '@renderer/Tools/hooks/useNewTranslationInput'
import { useRenameTranslationInput } from '@renderer/Tools/hooks/useRenameTranslationInput'
import { useToolLanguageConfig } from '@renderer/Tools/hooks/useToolLanguageConfig'
import { LanguageConfig } from '@renderer/Tools/LanguageConfig/LanguageConfig'
import { NewTranslationInput } from '@renderer/Tools/NewTranslationInput/NewTranslationInput'
import { RenameTranslationInput } from '@renderer/Tools/RenameTranslationInput/RenameTranslationInput'

export const GlobalToolsRegister = (): JSX.Element => {
  const languageConfigController = useToolLanguageConfig()
  const newTranslationInputController = useNewTranslationInput()
  const renameTranslationInputController = useRenameTranslationInput()
  const duplicateTranslationInputController = useDuplicateTranslationInput()
  const deleteTranslationDialogController = useDeleteTranslationDialog()
  const apiConnectorConfigController = useApiConnectorConfig()

  return (
    <>
      <LanguageConfig
        isOpen={languageConfigController.isOpen}
        onClose={languageConfigController.close}
        filesErrors={languageConfigController.data?.filesErrors}
      />
      <NewTranslationInput
        isOpen={newTranslationInputController.isOpen}
        onClose={newTranslationInputController.close}
      />
      <RenameTranslationInput
        isOpen={renameTranslationInputController.isOpen}
        onClose={renameTranslationInputController.close}
        idLiteralToRename={renameTranslationInputController.data?.idLiteralToRename}
      />
      <DeleteTranslationDialog
        isOpen={deleteTranslationDialogController.isOpen}
        onClose={deleteTranslationDialogController.close}
        idLiteralToDelete={deleteTranslationDialogController.data?.idLiteralToDelete}
      />
      <DuplicateTrasnlationInput
        isOpen={duplicateTranslationInputController.isOpen}
        onClose={duplicateTranslationInputController.close}
        idLiteralToDuplicate={duplicateTranslationInputController.data?.idLiteralToDuplicate}
      />
      <ApiConnectorsConfig
        isOpen={apiConnectorConfigController.isOpen}
        onClose={apiConnectorConfigController.close}
      ></ApiConnectorsConfig>
    </>
  )
}
