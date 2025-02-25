import { AcceptCancellDialog } from '@renderer/components/Commons/Dialogs/AcceptCancellDialog/AcceptCancellDialog'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { deleteLiteral } from '@renderer/core/literals/literals'

interface DeleteTranslationDialogProps {
  isOpen: boolean
  onClose: () => void
  idLiteralToDelete?: string
}

export const DeleteTranslationDialog = (props: DeleteTranslationDialogProps): JSX.Element => {
  const { project, setProject } = useProjectContext()

  const onAddTranslationHandler = (): void => {
    if (project.translation_info && props.idLiteralToDelete) {
      try {
        deleteLiteral(props.idLiteralToDelete, project.translation_info)
        setProject({ ...project })
      } catch (err) {
        //TODO: alert to error
        alert('Cannot rename literal')
      }
    } else {
      //TODO: alert to error
      alert('No tinfo')
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
