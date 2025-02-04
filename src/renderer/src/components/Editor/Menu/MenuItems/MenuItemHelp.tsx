import { MenuItem } from '@renderer/components/Editor/Menu/MenuItem/MenuItem'
import { TbHelpHexagon } from 'react-icons/tb'

export const MenuItemHelp = (): JSX.Element => {
  const onClickHandler = (): void => {
    alert('Touch')
  }

  return <MenuItem icon={TbHelpHexagon} onClick={onClickHandler} />
}
