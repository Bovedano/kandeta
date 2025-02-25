import { useThemeContext } from '@renderer/theme/useThemeContext'
import { useState } from 'react'
import { IconType } from 'react-icons'

interface MenuItemProps extends React.ComponentProps<IconType> {
  icon: IconType
  b_hover?: boolean
  b_selected?: boolean
  onHoverChange?: (isHovered: boolean) => void
}

export const Icon = (props: MenuItemProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const { theme } = useThemeContext()

  const onHoverHandler = (isHovered: boolean): void => {
    if (props.onHoverChange) {
      props.onHoverChange(isHovered)
    }
    setIsHovered(isHovered)
  }

  return (
    <props.icon
      {...props}
      color={
        props.b_selected || (props.b_hover && isHovered && props.b_hover)
          ? theme.icons.hover
          : theme.icons.color
      }
      onMouseEnter={() => onHoverHandler(true)}
      onMouseLeave={() => onHoverHandler(false)}
    />
  )
}
