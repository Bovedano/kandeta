import { CRadio } from '@renderer/components/Commons/CComponents/CRadio/CRadio'
import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { Icon } from '@renderer/components/Commons/Icon/Icon'
import { Separator } from '@renderer/components/Commons/Separator/Separator'
import { TranslatorBadge } from '@renderer/components/Commons/TranslatorBadge/TranslatorBadge'
import { TMConfiguration, TranslationModule, TranslationModuleConfig } from '@renderer/core/domain'
import { getConfiguration } from '@renderer/core/project/configurations'
import { Pane, TextInput } from 'evergreen-ui'
import { CiCircleChevRight } from 'react-icons/ci'
import { PiEmptyLight } from 'react-icons/pi'

interface ApiConnectorsConfigListItemProps {
  configurations: TMConfiguration[]
  module: TranslationModule
  onConfigurationChange: (id_module: string, id_configuration: string, value: string) => void
  isSelected: boolean
  onSelect: () => void
}

export const ApiConnectorsConfigListItem = (
  props: ApiConnectorsConfigListItemProps
): JSX.Element => {
  const getConfigurationValue = (config: TranslationModuleConfig): string => {
    const c = getConfiguration(props.configurations, props.module.id, config.id)
    if (c) {
      return c.value
    }
    return ''
  }

  if (props.module.config.length === 0) {
    return (
      <Pane display="flex" flexDirection="column" width="100%">
        <Pane display="flex" alignItems="center" width="100%" columnGap="10px">
          <CRadio checked={props.isSelected} onChange={props.onSelect} />
          <CText width="100%">{props.module.name}</CText>
          <TranslatorBadge initials={props.module.initials} color={props.module.color} size={16} />
        </Pane>
        <Separator horizontal />
        <Pane display="flex" flexDirection="column" paddingTop="10px" width="100%">
          <Pane display="flex" alignItems="center" columnGap="10px" width="100%">
            <Pane alignItems="center" marginTop="4px">
              <Icon icon={PiEmptyLight} />
            </Pane>
            <CText>This module has no settings</CText>
          </Pane>
        </Pane>
      </Pane>
    )
  }

  return (
    <Pane display="flex" flexDirection="column" width="100%">
      <Pane display="flex" alignItems="center" width="100%" columnGap="10px">
        <CRadio checked={props.isSelected} onChange={props.onSelect} />
        <CText width="100%">{props.module.name}</CText>
        <TranslatorBadge initials={props.module.initials} color={props.module.color} size={24} />
      </Pane>
      <Separator horizontal />
      <Pane display="flex" flexDirection="column" paddingTop="10px" width="100%" rowGap="12px">
        {props.module.config.map((config) => (
          <Pane display="flex" key={config.id} alignItems="center" columnGap="10px" width="100%">
            <Pane alignItems="center" marginTop="5px">
              <Icon icon={CiCircleChevRight} />
            </Pane>
            <CText>{config.name}</CText>
            <TextInput
              flex="1"
              value={getConfigurationValue(config)}
              onChange={(ev) =>
                props.onConfigurationChange(props.module.id, config.id, ev.target.value)
              }
            />
          </Pane>
        ))}
      </Pane>
    </Pane>
  )
}
