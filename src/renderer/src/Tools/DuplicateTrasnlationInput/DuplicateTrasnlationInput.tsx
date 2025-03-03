import { TextInputDialog } from '@renderer/components/Commons/Dialogs/TextInputDialog/TextInputDialog'
import { useSelectedLiteralContext } from '@renderer/context/useSelectedLiteralContext'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { duplicarteLiteral } from '@renderer/core/literals/literals'

interface DuplicateTrasnlationInputProps {
  isOpen: boolean
  onClose: () => void
  idLiteralToDuplicate?: string
}

export const DuplicateTrasnlationInput = (props: DuplicateTrasnlationInputProps): JSX.Element => {
  const { setLiteral_id } = useSelectedLiteralContext()
  const { project, setProject } = useProjectContext()

  const onAddTranslationHandler = (value: string): void => {
    console.log(value)
    if (props.idLiteralToDuplicate) {
      try {
        duplicarteLiteral(props.idLiteralToDuplicate, value, project.translation_info)
        setProject({ ...project })
        setLiteral_id(value)
      } catch (err) {
        //TODO: alert to error
        alert('Cannot duplicate literal')
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
      title="Duplicate Translation"
      label="New Translation Id"
      initValue={props.idLiteralToDuplicate}
    />
  )
}
