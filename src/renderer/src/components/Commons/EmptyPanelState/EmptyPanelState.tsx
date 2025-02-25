import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { Icon } from '@renderer/components/Commons/Icon/Icon'
import { Pane } from 'evergreen-ui'
import { PiEmptyThin } from 'react-icons/pi'

interface EmptyPanelStateProps {
  text: string
}

export const EmptyPanelState = (props: EmptyPanelStateProps): JSX.Element => {
  return (
    <Pane
      flexDirection="column"
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      opacity="50%"
    >
      <Icon icon={PiEmptyThin} fontSize="50" />
      <CText className="noSelectable">{props.text}</CText>
    </Pane>
  )
}
