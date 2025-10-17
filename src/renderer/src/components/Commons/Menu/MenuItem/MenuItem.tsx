import { Icon } from '@renderer/components/Commons/Icon/Icon'
import { MenuItemExtra } from '@renderer/components/Commons/Menu/MenuItemExtra/MenuItemExtra'
import { Pane } from 'evergreen-ui'
import { IconType } from 'react-icons'

interface MenuItemProps {
  id: string
  icon: IconType
  onClick?: () => void
  submenus?: SubMenu[][]
  hide?: boolean
}

export interface SubMenu {
  label: string
  onClick: () => void
  isDisabled?: boolean
}

export const MenuItem = (props: MenuItemProps): JSX.Element => {
  const onClickHandler = (): void => {
    if (props.onClick) {
      props.onClick()
    }
  }

  if (props.hide) {
    return <></>
  }

  return (
    <Pane id={props.id} className="menuItem" display="flex" height="100%" columnGap="2px">
      <Pane className="menuItem" display="flex" height="100%" alignItems="center">
        <Icon icon={props.icon} size={35} cursor={'pointer'} onClick={onClickHandler} b_hover />
      </Pane>
      {props.submenus && props.submenus.length > 0 && (
        <Pane display="flex" height="100%" alignItems="end">
          <MenuItemExtra id={props.id} submenus={props.submenus} />
        </Pane>
      )}
    </Pane>
  )
}
