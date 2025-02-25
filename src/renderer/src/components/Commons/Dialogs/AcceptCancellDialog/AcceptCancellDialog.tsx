import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { Dialog } from 'evergreen-ui'

interface AcceptCancellDialogProps {
  isOpen: boolean
  onConfirm: () => void
  onCancell: () => void
  title: string
  text: string
}

export const AcceptCancellDialog = (props: AcceptCancellDialogProps): JSX.Element => {
  return (
    <Dialog
      header={props.title}
      isShown={props.isOpen}
      onCancel={props.onCancell}
      confirmLabel="Accept"
      cancelLabel="Cancel"
      onConfirm={props.onConfirm}
    >
      <CText fontSize={20}>{props.text}</CText>
    </Dialog>
  )
}
