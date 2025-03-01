import { MenuItem } from '@renderer/components/Commons/Menu/MenuItem/MenuItem'
import { TbHelpHexagon } from 'react-icons/tb'

export const MenuItemHelp = (): JSX.Element => {
  const onClickHandler = (): void => {
    alert('Touch')
  }

  return <MenuItem id="help" icon={TbHelpHexagon} onClick={onClickHandler} hide />
}
