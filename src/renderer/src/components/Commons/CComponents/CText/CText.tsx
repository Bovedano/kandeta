import { useThemeContext } from '@renderer/theme/useThemeContext'
import { Text, TextProps } from 'evergreen-ui'
import { useState } from 'react'

interface CTextProps extends TextProps {
  b_selected?: boolean
  b_hover?: boolean
}

export const CText = (props: CTextProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const { theme } = useThemeContext()

  const onHoverHandler = (isHovered: boolean): void => {
    setIsHovered(isHovered)
  }

  return (
    <Text
      onMouseEnter={() => onHoverHandler(true)}
      onMouseLeave={() => onHoverHandler(false)}
      {...props}
      color={
        props.b_selected || (props.b_hover && isHovered)
          ? theme.texts.hover
          : props.color
            ? props.color
            : theme.texts.color
      }
    />
  )
}
