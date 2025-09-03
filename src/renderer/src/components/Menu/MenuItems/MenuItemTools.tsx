import { MenuItem } from '@renderer/components/Commons/Menu/MenuItem/MenuItem'
import { useError } from '@renderer/core/context/ErrorContext'
import { GrTools } from 'react-icons/gr'

export const MenuItemTools = (): JSX.Element => {
  const { showSimpleError } = useError()

  const onClickHandler = (): void => {
    showSimpleError('Tools menu not available', 'The tools functionality is not implemented yet.')
  }

  return <MenuItem id="tools" icon={GrTools} onClick={onClickHandler} hide />
}
