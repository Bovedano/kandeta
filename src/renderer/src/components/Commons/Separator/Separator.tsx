import { useThemeContext } from '@renderer/theme/useThemeContext'
import { Pane } from 'evergreen-ui'

export const Separator = (): JSX.Element => {
  const { theme } = useThemeContext()

  return <Pane height="100%" width="1px" backgroundColor={theme.texts.color}></Pane>
}
