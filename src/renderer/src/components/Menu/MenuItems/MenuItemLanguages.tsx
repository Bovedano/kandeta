import { MenuItem } from '@renderer/components/Commons/Menu/MenuItem/MenuItem'
import { LiaLanguageSolid } from 'react-icons/lia'
import { useToolLanguageConfig } from '@renderer/Tools/hooks/useToolLanguageConfig'

export const MenuItemLanguages = (): JSX.Element => {
  const languageConfigController = useToolLanguageConfig()

  const onClickHandler = (): void => {
    languageConfigController.open({
      filesErrors: []
    })
  }

  return (
    <>
      <MenuItem icon={LiaLanguageSolid} onClick={onClickHandler} />
    </>
  )
}
