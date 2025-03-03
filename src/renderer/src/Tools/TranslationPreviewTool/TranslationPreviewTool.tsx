import { LanguageDefinition } from '@renderer/core/domain'
import { Dialog } from 'evergreen-ui'

interface TranslationPreviewToolProps {
  isOpen: boolean
  onClose: () => void
  literal: string
  languages: string[]
}

export interface FormStateElement {
  language: LanguageDefinition
  value: string
  isDefault: boolean
}

export const TranslationPreviewTool = (props: TranslationPreviewToolProps): JSX.Element => {
  return (
    <Dialog
      header="Multiple Translation Tool"
      isShown={props.isOpen}
      onCloseComplete={props.onClose}
      onCancel={props.onClose}
      confirmLabel="Save"
      onConfirm={() => alert('Confirm')}
    >
      <></>
    </Dialog>
  )
}
