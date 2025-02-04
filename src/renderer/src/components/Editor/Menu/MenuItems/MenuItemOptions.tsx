import { MenuItem } from '@renderer/components/Editor/Menu/MenuItem/MenuItem'
import { IoIosOptions } from 'react-icons/io'

export const MenuItemOptions = (): JSX.Element => {
  const onClickHandler = (): void => {
    alert('Touch')
  }

  return <MenuItem icon={IoIosOptions} onClick={onClickHandler} />
}
