import { TextInputDialog } from '@renderer/components/Commons/Dialogs/TextInputDialog/TextInputDialog'
import { useSelectedLiteralContext } from '@renderer/context/useSelectedLiteralContext'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { duplicarteLiteral } from '@renderer/core/literals/literals'
import { useError } from '@renderer/core/context/ErrorContext'

interface DuplicateTranslationInputProps {
  isOpen: boolean
  onClose: () => void
  idLiteralToDuplicate?: string
}

export const DuplicateTranslationInput = (props: DuplicateTranslationInputProps): JSX.Element => {
  const { setLiteral_id } = useSelectedLiteralContext()
  const { project, setProject } = useProjectContext()
  const { showSimpleError } = useError()

  const onAddTranslationHandler = (value: string): void => {
    console.log(value)
    if (props.idLiteralToDuplicate) {
      try {
        duplicarteLiteral(props.idLiteralToDuplicate, value, project.translation_info)
        setProject({ ...project })
        setLiteral_id(value)
      } catch (err) {
        showSimpleError(
          'Cannot duplicate literal',
          'An error occurred while trying to duplicate the literal.'
        )
      }
    } else {
      showSimpleError(
        'Translation information not found',
        'No translation information available to perform the duplication operation.'
      )
    }

    props.onClose()
  }

  return (
    <TextInputDialog
      onConfirm={onAddTranslationHandler}
      isOpen={props.isOpen}
      onCancell={props.onClose}
      title="Duplicate Translation"
      label="New Translation Id"
      initValue={props.idLiteralToDuplicate}
    />
  )
}
