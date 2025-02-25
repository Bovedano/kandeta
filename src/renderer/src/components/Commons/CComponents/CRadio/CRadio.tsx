import { useThemeContext } from '@renderer/theme/useThemeContext'
import { Radio, RadioProps } from 'evergreen-ui'

interface CRadioProps extends RadioProps {
  b_selected?: boolean
}

export const CRadio = (props: CRadioProps): JSX.Element => {
  const { theme } = useThemeContext()
  return <Radio {...props} color={props.b_selected ? theme.texts.hover : theme.texts.color} />
}
