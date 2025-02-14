import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { Icon } from '@renderer/components/Commons/Icon/Icon'
import { Literal } from '@renderer/core/domain'
import { Pane } from 'evergreen-ui'
import { FaCheck } from 'react-icons/fa6'

interface EditorListItemProps {
  literal: Literal
  isSelected: boolean
  onSelect: (id: string) => void
}

export const EditorListItem = (props: EditorListItemProps): JSX.Element => {
  return (
    <Pane display="flex" columnGap="5px" alignItems="center" paddingLeft="15px">
      <Icon icon={FaCheck} fontSize={'small'} />
      <CText
        b_selected={props.isSelected}
        fontWeight={props.isSelected ? 'bold' : 'normal'}
        size="small"
        cursor="pointer"
        onClick={() => props.onSelect(props.literal.id)}
      >
        {props.literal.id}
      </CText>
    </Pane>
  )
}
