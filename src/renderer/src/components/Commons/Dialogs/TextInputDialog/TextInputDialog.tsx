import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { Dialog, TextInput } from 'evergreen-ui'
import { useEffect, useState } from 'react'

interface TextInputDialogProps {
  isOpen: boolean
  onConfirm: (value: string) => void
  onCancell: () => void
  title: string
  label?: string
  placeholder?: string
  initValue?: string
}

export const TextInputDialog = (props: TextInputDialogProps): JSX.Element => {
  const [value, setValue] = useState<string>(props.initValue || '')

  useEffect(() => {
    if (props.isOpen) {
      setValue(props.initValue || '')
    }
  }, [props.isOpen])

  return (
    <Dialog
      header={props.title}
      isShown={props.isOpen}
      onCancel={props.onCancell}
      confirmLabel="Save"
      onConfirm={() => props.onConfirm(value)}
    >
      <CText>{props.label ? props.label : ''}</CText>
      <TextInput
        width="100%"
        borderRadius="5px"
        placeholder={props.placeholder ? props.placeholder : ''}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
    </Dialog>
  )
}
