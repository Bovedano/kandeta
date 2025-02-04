import { Theme } from '@renderer/theme/theme'

export const drk_theme = (): Theme => {
  const theme: Theme = {
    icons: {
      color: 'white',
      hover: 'cyan'
    },
    texts: {
      color: 'white',
      hover: 'cyan'
    },
    backgrounds: {
      color: '#303030',
      hover: '',
      menu: '#242323',
      toolbars: '#303030'
    },
    inputs: {
      color: 'white',
      back: '#474747'
    }
  }

  return theme
}
