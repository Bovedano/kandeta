import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { Literal } from '@renderer/core/domain'

interface EditorDetailToolbarProps {
  literal: Literal
}

export const EditorDetailToolbar = (props: EditorDetailToolbarProps): JSX.Element => {
  return <CText>{props.literal.id}</CText>
}
