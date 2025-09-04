import { TextInputDialog } from '@renderer/components/Commons/Dialogs/TextInputDialog/TextInputDialog'
import { useSelectedLiteralContext } from '@renderer/context/useSelectedLiteralContext'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { useFilterContext } from '@renderer/context/useFilterContext'
import { addLiteralToTranslationInfo } from '@renderer/core/literals/literals'

interface NewTranslationInputProps {
  isOpen: boolean
  onClose: () => void
  initialValue?: string
}

export const NewTranslationInput = (props: NewTranslationInputProps): JSX.Element => {
  const { setLiteral_id } = useSelectedLiteralContext()
  const { project, setProject } = useProjectContext()
  const { clearFilter } = useFilterContext()

  const onAddTranslationHandler = (value: string): void => {
    addLiteralToTranslationInfo(
      project.translation_info,
      project.translation_info.default_language_id,
      value,
      '',
      true
    )
    setProject({ ...project })
    setLiteral_id(value)

    if (clearFilter) {
      clearFilter()
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
      initValue={props.initialValue}
    />
  )
}
