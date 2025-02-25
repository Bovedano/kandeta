import { TextInputDialog } from '@renderer/components/Commons/Dialogs/TextInputDialog/TextInputDialog'
import { useSelectedLiteralContext } from '@renderer/context/useSelectedLiteralContext'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { addLiteralToTranslationInfo } from '@renderer/core/literals/literals'

interface NewTranslationInputProps {
  isOpen: boolean
  onClose: () => void
}

export const NewTranslationInput = (props: NewTranslationInputProps): JSX.Element => {
  const { setLiteral_id } = useSelectedLiteralContext()
  const { project, setProject } = useProjectContext()

  const onAddTranslationHandler = (value: string): void => {
    console.log(value)
    if (project.translation_info) {
      addLiteralToTranslationInfo(
        project.translation_info,
        project.translation_info.default_language_id,
        value,
        '',
        true
      )
      setProject({ ...project })
      setLiteral_id(value)
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
      title="New Translation"
      label="Translation Id"
    />
  )
}
