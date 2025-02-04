import { Icon } from '@renderer/components/Commons/Icon/Icon'
import { IconType } from 'react-icons'

interface MenuItemProps {
  icon: IconType
  onClick?: () => void
}

export const MenuItem = (props: MenuItemProps): JSX.Element => {
  return <Icon icon={props.icon} size={35} cursor={'pointer'} onClick={props.onClick} b_hover />
}
