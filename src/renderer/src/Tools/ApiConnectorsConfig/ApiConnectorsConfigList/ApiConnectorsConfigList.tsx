import { TMConfig } from '@renderer/core/domain'
import { addOrUpdateConfiguration } from '@renderer/core/project/configurations'
import { modules } from '@renderer/core/translators/register'
import { ApiConnectorsConfigListItem } from '@renderer/Tools/ApiConnectorsConfig/ApiConnectorsConfigListItem/ApiConnectorsConfigListItem'
import { Pane } from 'evergreen-ui'

interface ApiConnectorsConfigList {
  tmConfiguration: TMConfig
  onTMConfigurationChange: (tmConfiguration: TMConfig) => void
}

export const ApiConnectorsConfigList = (props: ApiConnectorsConfigList): JSX.Element => {
  const onConfigurationChangeHandler = (
    id_module: string,
    id_configuration: string,
    value: string
  ): void => {
    addOrUpdateConfiguration(props.tmConfiguration, {
      id: id_configuration,
      module_id: id_module,
      value: value
    })
    props.onTMConfigurationChange({ ...props.tmConfiguration })
  }

  const onSelectTM = (id: string): void => {
    props.onTMConfigurationChange({ ...props.tmConfiguration, selected_tm: id })
  }

  return (
    <Pane display="flex" flexDirection="column" height="100%" width="100%" rowGap="10px">
      {modules.map((module) => (
        <ApiConnectorsConfigListItem
          onConfigurationChange={onConfigurationChangeHandler}
          key={module.id}
          module={module}
          configurations={props.tmConfiguration.tm_configurations.filter(
            (tmc) => tmc.module_id === module.id
          )}
          isSelected={module.id === props.tmConfiguration.selected_tm}
          onSelect={() => onSelectTM(module.id)}
        />
      ))}
    </Pane>
  )
}
