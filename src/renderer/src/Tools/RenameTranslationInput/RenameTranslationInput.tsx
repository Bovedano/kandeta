import { TextInputDialog } from '@renderer/components/Commons/Dialogs/TextInputDialog/TextInputDialog'
import { useSelectedLiteralContext } from '@renderer/context/useSelectedLiteralContext'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { renameLiteral } from '@renderer/core/literals/literals'
import { useError } from '@renderer/core/context/ErrorContext'

interface RenameTranslationInputProps {
  isOpen: boolean
  onClose: () => void
  idLiteralToRename?: string
}

export const RenameTranslationInput = (props: RenameTranslationInputProps): JSX.Element => {
  const { setLiteral_id } = useSelectedLiteralContext()
  const { project, setProject } = useProjectContext()
  const { showSimpleError } = useError()

  const onAddTranslationHandler = (value: string): void => {
    console.log(value)
    if (props.idLiteralToRename) {
      try {
        renameLiteral(props.idLiteralToRename, value, project.translation_info)
        setProject({ ...project })
        setLiteral_id(value)
      } catch (err) {
        showSimpleError(
          'Cannot rename literal',
          'An error occurred while trying to rename the literal.'
        )
      }
    } else {
      showSimpleError(
        'Translation information not found',
        'No translation information available to perform the rename operation.'
      )
    }

    props.onClose()
  }

  return (
    <TextInputDialog
      onConfirm={onAddTranslationHandler}
      isOpen={props.isOpen}
      onCancell={props.onClose}
      title="Rename Translation"
      label="Translation Id"
      initValue={props.idLiteralToRename}
    />
  )
}
