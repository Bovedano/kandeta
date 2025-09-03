import { MenuItem } from '@renderer/components/Commons/Menu/MenuItem/MenuItem'
import { useError } from '@renderer/core/context/ErrorContext'
import { IoIosOptions } from 'react-icons/io'

export const MenuItemOptions = (): JSX.Element => {
  const { showSimpleError } = useError()

  const onClickHandler = (): void => {
    showSimpleError(
      'Options menu not available',
      'The options functionality is not implemented yet.'
    )
  }

  return <MenuItem id="options" icon={IoIosOptions} onClick={onClickHandler} hide />
}
