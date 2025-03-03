import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { Dialog } from 'evergreen-ui'

interface MessageDialogProps {
  isOpen: boolean
  onConfirm: () => void
  title: string
  text: string
}

export const MessageDialog = (props: MessageDialogProps): JSX.Element => {
  return (
    <Dialog
      header={props.title}
      isShown={props.isOpen}
      confirmLabel="Accept"
      onConfirm={() => props.onConfirm()}
    >
      <CText fontSize={20}>{props.text}</CText>
    </Dialog>
  )
}
