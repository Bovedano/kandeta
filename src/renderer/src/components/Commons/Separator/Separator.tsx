import { useThemeContext } from '@renderer/theme/useThemeContext'
import { Pane } from 'evergreen-ui'

interface SeparatorProps {
  horizontal?: boolean
  margins?: number
  opacity?: number
}

export const Separator = (props: SeparatorProps): JSX.Element => {
  const { theme } = useThemeContext()
  const calcsize: string = 'calc(100% - ' + (props.margins ? props.margins : '0') + 'px)'
  if (props.horizontal) {
    return (
      <Pane
        className="separator"
        width={calcsize}
        height="1px"
        backgroundColor={theme.texts.color}
        opacity={props.opacity ? props.opacity + '%' : '100%'}
      ></Pane>
    )
  }
  return (
    <Pane
      className="separator"
      height={calcsize}
      width="1px"
      backgroundColor={theme.texts.color}
      opacity={props.opacity ? props.opacity + '%' : '100%'}
    ></Pane>
  )
}
