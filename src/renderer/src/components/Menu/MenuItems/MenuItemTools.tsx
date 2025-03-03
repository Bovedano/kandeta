import { MenuItem } from '@renderer/components/Commons/Menu/MenuItem/MenuItem'
import { GrTools } from 'react-icons/gr'

export const MenuItemTools = (): JSX.Element => {
  const onClickHandler = (): void => {
    alert('Touch')
  }

  return <MenuItem id="tools" icon={GrTools} onClick={onClickHandler} hide />
}
