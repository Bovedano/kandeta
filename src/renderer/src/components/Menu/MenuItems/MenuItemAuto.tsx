import { MenuItem } from '@renderer/components/Commons/Menu/MenuItem/MenuItem'
import { useApiConnectorConfig } from '@renderer/Tools/hooks/useApiConnectorConfig'
import { AiOutlineApi } from 'react-icons/ai'

export const MenuItemAuto = (): JSX.Element => {
  const apiConnectorConfigController = useApiConnectorConfig()

  const onClickHandler = (): void => {
    apiConnectorConfigController.open()
  }

  return <MenuItem id="auto" icon={AiOutlineApi} onClick={onClickHandler} />
}
