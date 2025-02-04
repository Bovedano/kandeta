import { MenuItem } from '@renderer/components/Editor/Menu/MenuItem/MenuItem'
import { IoSaveOutline } from 'react-icons/io5'

export const MenuItemSave = (): JSX.Element => {
  const onClickHandler = (): void => {
    alert('Touch')
  }

  return <MenuItem icon={IoSaveOutline} onClick={onClickHandler} />
}
