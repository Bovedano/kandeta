import { MenuItem } from '@renderer/components/Commons/Menu/MenuItem/MenuItem'
import { IoIosOptions } from 'react-icons/io'

export const MenuItemOptions = (): JSX.Element => {
  const onClickHandler = (): void => {
    alert('Touch')
  }

  return <MenuItem id="options" icon={IoIosOptions} onClick={onClickHandler} />
}
