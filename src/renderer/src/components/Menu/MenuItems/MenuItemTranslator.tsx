import { TranslatorBadge } from '@renderer/components/Commons/TranslatorBadge/TranslatorBadge'
import { TranslatorContextMenu } from '@renderer/components/Commons/TranslatorContextMenu/TranslatorContextMenu'
import { useConfigContext } from '@renderer/context/useConfigContext'
import { getTranslationModule } from '@renderer/core/translators/register'
import { Pane } from 'evergreen-ui'

export const MenuItemTranslator = (): JSX.Element => {
  const { config } = useConfigContext()
  const selectedTM = getTranslationModule(config.tm_configuration.selected_tm)

  if (!selectedTM) {
    return <></>
  }

  return (
    <Pane display="flex" height="100%" alignItems="center">
      <TranslatorContextMenu selectedModuleId={selectedTM.id}>
        <TranslatorBadge initials={selectedTM.initials} color={selectedTM.color} size={24} />
      </TranslatorContextMenu>
    </Pane>
  )
}
