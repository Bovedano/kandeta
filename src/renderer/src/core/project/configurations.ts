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

/**
 * Gets the value of a configuration property by its id.
 * This utility assumes the configurations array is already filtered by module_id.
 * @param configurations - Array of configurations (should be pre-filtered by module_id)
 * @param id - The configuration property id to retrieve
 * @param defaultValue - Default value if configuration is not found or empty
 * @returns The configuration value or default value
 */
export const getConfigValue = (
  configurations: TMConfiguration[],
  id: string,
  defaultValue: string = ''
): string => {
  const config = configurations.find((c) => c.id === id)
  return config?.value || defaultValue
}

/**
 * Gets the value of a required configuration property by its id.
 * This utility assumes the configurations array is already filtered by module_id.
 * @param configurations - Array of configurations (should be pre-filtered by module_id)
 * @param id - The configuration property id to retrieve
 * @param errorMessage - Error message to throw if configuration is not found or empty
 * @returns The configuration value
 * @throws Error if configuration is not found or empty
 */
export const getRequiredConfigValue = (
  configurations: TMConfiguration[],
  id: string,
  errorMessage: string
): string => {
  const value = getConfigValue(configurations, id)
  if (!value) {
    throw new Error(errorMessage)
  }
  return value
}
