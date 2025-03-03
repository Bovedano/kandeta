import { Config } from '@renderer/core/domain'
import { useStore } from '@renderer/hooks/useStore'
import React, { useContext, useEffect, useState } from 'react'

interface ConfigProviderProps {
  children: React.ReactElement | React.ReactElement[]
}

interface ConfigState {
  config: Config
}

interface ConfigContext extends ConfigState {
  setConfig: (config: Config) => void
  setAll: (data: ConfigState) => void
}

const defContext: ConfigContext = {
  config: {
    tm_configuration: {
      tm_configurations: [],
      selected_tm: 'freegoogle'
    }
  },
  setConfig: () => {},
  setAll: () => {}
}

const ctx = React.createContext<ConfigContext>(defContext)

export const ConfigProvider = (props: ConfigProviderProps): JSX.Element => {
  const store = useStore<Config>('config.cfg')
  const [data, setData] = useState<ConfigState>(defContext)

  useEffect(() => {
    store.get().then((config) =>
      setData({
        ...data,
        config
      })
    )
  }, [])

  const setConfig = (config: Config): void => {
    const newConfig: Config = {
      tm_configuration: config.tm_configuration
    }
    setData({
      ...data,
      config: newConfig
    })
    store.set(newConfig)
  }

  const value = {
    config: data.config,
    setConfig,
    setAll: setData
  }

  return <ctx.Provider value={value} {...props} />
}

export const useConfigContext = (): ConfigContext => {
  const contexto = useContext(ctx)

  if (!contexto) {
    throw 'Para utilizar useConfigContext el componente debe estar anidado en el proveedor ConfigProvider'
  }

  return contexto
}
