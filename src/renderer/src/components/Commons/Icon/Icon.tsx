import { useThemeContext } from '@renderer/theme/useThemeContext'
import { useState } from 'react'
import { IconType } from 'react-icons'

interface MenuItemProps extends React.ComponentProps<IconType> {
  icon: IconType
  b_hover?: boolean
}

export const Icon = (props: MenuItemProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const { theme } = useThemeContext()

  return (
    <props.icon
      {...props}
      color={isHovered && props.b_hover ? theme.icons.hover : theme.icons.color}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  )
}
