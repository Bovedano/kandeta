import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { Literal } from '@renderer/core/domain'
import { Pane } from 'evergreen-ui'

interface EditorDetailToolbarProps {
  literal: Literal
}

export const EditorDetailToolbar = (props: EditorDetailToolbarProps): JSX.Element => {
  return (
    <Pane display="flex" height="100%" width="100%" alignItems="center">
      <CText>{props.literal.id}</CText>
    </Pane>
  )
}
