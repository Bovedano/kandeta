import { AcceptCancellDialog } from '@renderer/components/Commons/Dialogs/AcceptCancellDialog/AcceptCancellDialog'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { deleteLiteral } from '@renderer/core/literals/literals'
import { useError } from '@renderer/core/context/ErrorContext'

interface DeleteTranslationDialogProps {
  isOpen: boolean
  onClose: () => void
  idLiteralToDelete?: string
}

export const DeleteTranslationDialog = (props: DeleteTranslationDialogProps): JSX.Element => {
  const { project, setProject } = useProjectContext()
  const { showSimpleError } = useError()

  const onAddTranslationHandler = (): void => {
    if (props.idLiteralToDelete) {
      try {
        deleteLiteral(props.idLiteralToDelete, project.translation_info)
        setProject({ ...project })
      } catch (err) {
        showSimpleError(
          'Cannot delete literal',
          'An error occurred while trying to delete the literal.'
        )
      }
    } else {
      showSimpleError(
        'Translation information not found',
        'No translation information available to perform the deletion operation.'
      )
    }

    props.onClose()
  }

  return (
    <AcceptCancellDialog
      onConfirm={onAddTranslationHandler}
      isOpen={props.isOpen}
      onCancell={props.onClose}
      title={"Delete Translation: '" + props.idLiteralToDelete + "'"}
      text="Are you sure you want to remove the translation?"
    />
  )
}
