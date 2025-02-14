import { MenuItem } from '@renderer/components/Commons/Menu/MenuItem/MenuItem'
import { AiOutlineApi } from 'react-icons/ai'

export const MenuItemAuto = (): JSX.Element => {
  const onClickHandler = (): void => {
    alert('Touch')
  }

  return <MenuItem icon={AiOutlineApi} onClick={onClickHandler} />
}
