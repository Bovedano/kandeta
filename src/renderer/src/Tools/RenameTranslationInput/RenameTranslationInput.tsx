import { TextInputDialog } from '@renderer/components/Commons/Dialogs/TextInputDialog/TextInputDialog'
import { useSelectedLiteralContext } from '@renderer/context/useSelectedLiteralContext'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { renameLiteral } from '@renderer/core/literals/literals'

interface RenameTranslationInputProps {
  isOpen: boolean
  onClose: () => void
  idLiteralToRename?: string
}

export const RenameTranslationInput = (props: RenameTranslationInputProps): JSX.Element => {
  const { setLiteral_id } = useSelectedLiteralContext()
  const { project, setProject } = useProjectContext()

  const onAddTranslationHandler = (value: string): void => {
    console.log(value)
    if (project.translation_info && props.idLiteralToRename) {
      try {
        renameLiteral(props.idLiteralToRename, value, project.translation_info)
        setProject({ ...project })
        setLiteral_id(value)
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
