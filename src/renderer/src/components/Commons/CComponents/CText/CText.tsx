import { useThemeContext } from '@renderer/theme/useThemeContext'
import { Text, TextProps } from 'evergreen-ui'

interface CTextProps extends TextProps {
  b_selected?: boolean
}

export const CText = (props: CTextProps): JSX.Element => {
  const { theme } = useThemeContext()
  return <Text {...props} color={props.b_selected ? theme.texts.hover : theme.texts.color} />
}
