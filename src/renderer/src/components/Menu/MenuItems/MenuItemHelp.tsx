import { MenuItem } from '@renderer/components/Commons/Menu/MenuItem/MenuItem'
import { useError } from '@renderer/core/context/ErrorContext'
import { TbHelpHexagon } from 'react-icons/tb'

export const MenuItemHelp = (): JSX.Element => {
  const { showSimpleError } = useError()

  const onClickHandler = (): void => {
    showSimpleError('Help menu not available', 'The help functionality is not implemented yet.')
  }

  return <MenuItem id="help" icon={TbHelpHexagon} onClick={onClickHandler} hide />
}
