import { TranslatorBadge } from '@renderer/components/Commons/TranslatorBadge/TranslatorBadge'
import { useConfigContext } from '@renderer/context/useConfigContext'
import { getTranslationModule } from '@renderer/core/translators/register'
import { useApiConnectorConfig } from '@renderer/Tools/hooks/useApiConnectorConfig'
import { Pane } from 'evergreen-ui'

export const MenuItemTranslator = (): JSX.Element => {
  const { config } = useConfigContext()
  const selectedTM = getTranslationModule(config.tm_configuration.selected_tm)
  const apiConnectorConfig = useApiConnectorConfig()

  if (!selectedTM) {
    return <></>
  }

  const onClickHandler = (): void => {
    apiConnectorConfig.open()
  }

  return (
    <Pane display="flex" height="100%" alignItems="center">
      <TranslatorBadge
        initials={selectedTM.initials}
        color={selectedTM.color}
        size={24}
        onClick={onClickHandler}
      />
    </Pane>
  )
}
