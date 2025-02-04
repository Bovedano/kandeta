import { MenuItem } from '@renderer/components/Editor/Menu/MenuItem/MenuItem'
import { GrTools } from 'react-icons/gr'

export const MenuItemTools = (): JSX.Element => {
  const onClickHandler = (): void => {
    alert('Touch')
  }

  return <MenuItem icon={GrTools} onClick={onClickHandler} />
}
