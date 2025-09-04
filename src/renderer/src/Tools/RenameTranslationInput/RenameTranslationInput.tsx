import { TextInputDialog } from '@renderer/components/Commons/Dialogs/TextInputDialog/TextInputDialog'
import { useSelectedLiteralContext } from '@renderer/context/useSelectedLiteralContext'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { renameLiteral } from '@renderer/core/literals/literals'
import { useError } from '@renderer/core/context/ErrorContext'
import { useFilterContext } from '@renderer/context/useFilterContext'

interface RenameTranslationInputProps {
  isOpen: boolean
  onClose: () => void
  idLiteralToRename?: string
}

export const RenameTranslationInput = (props: RenameTranslationInputProps): JSX.Element => {
  const { setLiteral_id } = useSelectedLiteralContext()
  const { project, setProject } = useProjectContext()
  const { showSimpleError } = useError()
  const { clearFilter } = useFilterContext()

  const onAddTranslationHandler = (value: string): void => {
    if (props.idLiteralToRename) {
      try {
        // Check if the new ID already exists (and it's not the same as current)
        if (value !== props.idLiteralToRename) {
          const existingLiteral = project.translation_info.literals.find(lit => lit.id === value)
          if (existingLiteral) {
            showSimpleError(
              'Literal ID already exists',
              'A literal with this ID already exists. Please choose a different ID.'
            )
            return
          }
        }

        renameLiteral(props.idLiteralToRename, value, project.translation_info)
        setProject({ ...project })
        clearFilter()
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
