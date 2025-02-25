import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { LanguageDefinition, TMConfig } from '@renderer/core/domain'
import { ApiConnectorsConfigList } from '@renderer/Tools/ApiConnectorsConfig/ApiConnectorsConfigList/ApiConnectorsConfigList'
import { useApiConnectorConfig } from '@renderer/Tools/hooks/useApiConnectorConfig'

import { Dialog } from 'evergreen-ui'
import { useEffect, useState } from 'react'

interface ApiConnectorsConfigProps {
  isOpen: boolean
  onClose: () => void
}

export interface FormStateElement {
  language: LanguageDefinition
  value: string
  isDefault: boolean
}

export const ApiConnectorsConfig = (props: ApiConnectorsConfigProps): JSX.Element => {
  const { project, setProject } = useProjectContext()

  const [localTMConfig, setLocalTMConfig] = useState<TMConfig>({
    selected_tm: project.tm_configuration.selected_tm,
    tm_configurations: project.tm_configuration.tm_configurations.map((conf) => ({
      ...conf
    }))
  })

  useEffect(() => {
    console.log('project', project)
    if (props.isOpen) {
      setLocalTMConfig({
        selected_tm: project.tm_configuration.selected_tm,
        tm_configurations: project.tm_configuration.tm_configurations.map((conf) => ({
          ...conf
        }))
      })
    }
  }, [props.isOpen, project])

  const apiConnectorConfigController = useApiConnectorConfig()

  const onConfirmValue = (): void => {
    setProject({ ...project, tm_configuration: localTMConfig })
    apiConnectorConfigController.close()
  }

  return (
    <Dialog
      header="Translation Services Configuration"
      isShown={props.isOpen}
      onCloseComplete={props.onClose}
      onCancel={props.onClose}
      confirmLabel="Save"
      onConfirm={onConfirmValue}
    >
      <ApiConnectorsConfigList
        onTMConfigurationChange={setLocalTMConfig}
        tmConfiguration={localTMConfig}
      />
    </Dialog>
  )
}
