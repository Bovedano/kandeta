import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { Icon } from '@renderer/components/Commons/Icon/Icon'
import { Literal } from '@renderer/core/domain'
import { Pane } from 'evergreen-ui'
import { MdContentCopy } from 'react-icons/md'

interface EditorDetailToolbarProps {
  literal: Literal
}

export const EditorDetailToolbar = (props: EditorDetailToolbarProps): JSX.Element => {
  const onCopyHandler = (textToCopy: string): void => {
    //Copy the textToCopy param to clipboard
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => console.log('Texto copiado al portapapeles'))
      .catch((err) => console.error('Error al copiar el texto:', err))
    //TODO: toast copied
  }

  return (
    <Pane
      display="flex"
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      <CText>{props.literal.id}</CText>
      <Icon
        icon={MdContentCopy}
        b_hover
        cursor={'pointer'}
        onClick={() => onCopyHandler(props.literal.id)}
      />
    </Pane>
  )
}
