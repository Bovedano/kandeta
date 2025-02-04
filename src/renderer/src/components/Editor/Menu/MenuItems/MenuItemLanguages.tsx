import { LanguageConfig } from '@renderer/components/Editor/LanguageConfig/LanguageConfig'
import { MenuItem } from '@renderer/components/Editor/Menu/MenuItem/MenuItem'
import { useState } from 'react'
import { LiaLanguageSolid } from 'react-icons/lia'

export const MenuItemLanguages = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onClickHandler = (): void => {
    setIsOpen(true)
  }

  return (
    <>
      <MenuItem icon={LiaLanguageSolid} onClick={onClickHandler} />
      <LanguageConfig isOpen={isOpen || true} onClose={() => setIsOpen(false)} />
    </>
  )
}
