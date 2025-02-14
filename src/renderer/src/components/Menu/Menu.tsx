import { Separator } from '@renderer/components/Commons/Separator/Separator'
import { MenuItemAuto } from '@renderer/components/Menu/MenuItems/MenuItemAuto'
import { MenuItemHelp } from '@renderer/components/Menu/MenuItems/MenuItemHelp'
import { MenuItemLanguages } from '@renderer/components/Menu/MenuItems/MenuItemLanguages'
import { MenuItemOpen } from '@renderer/components/Menu/MenuItems/MenuItemOpen'
import { MenuItemOptions } from '@renderer/components/Menu/MenuItems/MenuItemOptions'
import { MenuItemSave } from '@renderer/components/Menu/MenuItems/MenuItemSave'
import { MenuItemTools } from '@renderer/components/Menu/MenuItems/MenuItemTools'
import { useThemeContext } from '@renderer/theme/useThemeContext'
import { Pane } from 'evergreen-ui'

export const Menu = (): JSX.Element => {
  const menuRowGap = 15
  const { theme } = useThemeContext()
  return (
    <Pane
      display="flex"
      paddingX="10px"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      height="100%"
      background={theme.backgrounds.menu}
      paddingY="10px"
    >
      <Pane display="flex" columnGap={menuRowGap + 'px'} height="100%" alignItems="center">
        <MenuItemOpen />
        <MenuItemSave />
        <Separator />
        <MenuItemLanguages />
        <MenuItemAuto />
        <MenuItemTools />
      </Pane>
      <Pane display="flex" columnGap={menuRowGap + 'px'} height="100%" alignItems="center">
        <MenuItemOptions />
        <MenuItemHelp />
      </Pane>
    </Pane>
  )
}
