import { TextInputDialog } from '@renderer/components/Commons/Dialogs/TextInputDialog/TextInputDialog'
import { useSelectedLiteralContext } from '@renderer/context/useSelectedLiteralContext'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { duplicarteLiteral } from '@renderer/core/literals/literals'
import { useError } from '@renderer/core/context/ErrorContext'
import { useFilterContext } from '@renderer/context/useFilterContext'

interface DuplicateTranslationInputProps {
  isOpen: boolean
  onClose: () => void
  idLiteralToDuplicate?: string
}

export const DuplicateTranslationInput = (props: DuplicateTranslationInputProps): JSX.Element => {
  const { setLiteral_id } = useSelectedLiteralContext()
  const { project, setProject } = useProjectContext()
  const { showSimpleError } = useError()
  const { clearFilter } = useFilterContext()

  const onAddTranslationHandler = (value: string): void => {
    if (props.idLiteralToDuplicate) {
      try {
        // Check if the new ID already exists
        const existingLiteral = project.translation_info.literals.find(lit => lit.id === value)
        if (existingLiteral) {
          showSimpleError(
            'Literal ID already exists',
            'A literal with this ID already exists. Please choose a different ID.'
          )
          return
        }

        duplicarteLiteral(props.idLiteralToDuplicate, value, project.translation_info)
        setProject({ ...project })
        clearFilter()
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
      initValue={props.idLiteralToDuplicate ? `${props.idLiteralToDuplicate}_copy` : ''}
    />
  )
}
