import { TMConfig, TMConfiguration } from '@renderer/core/domain'

export const addOrUpdateConfiguration = (
  config: TMConfig,
  new_configuration: TMConfiguration
): TMConfig => {
  const actual_configuration = getConfiguration(
    config.tm_configurations,
    new_configuration.module_id,
    new_configuration.id
  )

  if (!actual_configuration) {
    config.tm_configurations.push(new_configuration)
  } else {
    actual_configuration.value = new_configuration.value
  }

  return config
}

export const getConfiguration = (
  configurations: TMConfiguration[],
  module_id: string,
  id: string
): TMConfiguration | undefined => {
  return configurations.find((c) => c.id === id && c.module_id === module_id)
}
