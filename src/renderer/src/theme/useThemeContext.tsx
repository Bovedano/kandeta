import { Theme } from '@renderer/theme/theme'
import { drk_theme } from '@renderer/theme/themes/drk'
import React, { useContext, useState } from 'react'

interface ThemeProviderProps {
  children: React.ReactElement | React.ReactElement[]
}

interface ThemeState {
  theme: Theme
}

interface ThemeContext extends ThemeState {
  setTheme: (theme: Theme) => void
  setAll: (data: ThemeState) => void
}

const defContext: ThemeContext = {
  theme: drk_theme(),
  setTheme: () => {},
  setAll: () => {}
}

const ctx = React.createContext<ThemeContext>(defContext)

export const ThemeProvider = (props: ThemeProviderProps): JSX.Element => {
  const [data, setData] = useState<ThemeState>(defContext)

  const setTheme = (theme: Theme): void => {
    setData({
      ...data,
      theme
    })
  }

  const value = {
    theme: data.theme,
    setTheme,
    setAll: setData
  }

  return <ctx.Provider value={value} {...props} />
}

export const useThemeContext = (): ThemeContext => {
  const contexto = useContext(ctx)

  if (!contexto) {
    throw 'Para utilizar useThemeContext el componente debe estar anidado en el proveedor ThemeProvider'
  }

  return contexto
}
