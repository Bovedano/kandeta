import { DefaultTheme, ThemeProvider, defaultTheme, mergeTheme } from 'evergreen-ui'
import { Global, css } from '@emotion/react'
interface EvergreenCustomizerProps {
  children: JSX.Element
}

export const EvergreenCustomizer = (props: EvergreenCustomizerProps): JSX.Element => {
  const customTheme: DefaultTheme = mergeTheme(defaultTheme, {
    components: {
      Pane: {
        baseStyle: {
          backgroundColor: '#2d2d2d'
        }
      },
      DialogHeader: {
        baseStyle: {
          backgroundColor: '#2d2d2d',
          color: '#ffffff'
        }
      },
      DialogBody: {
        baseStyle: {
          backgroundColor: '#2d2d2d',
          color: '#ffffff'
        }
      },
      DialogFooter: {
        baseStyle: {
          backgroundColor: '#2d2d2d',
          color: '#ff0000'
        }
      },
      MenuItem: {
        baseStyle: {
          backgroundColor: '#2d2d2d',
          color: '#ff0000'
        }
      },
      Input: {
        baseStyle: {
          backgroundColor: '#2d2d2d',
          color: 'black'
        }
      },
      Spinner: {
        baseStyle: {
          backgroundColor: '#2d2d2d',
          color: 'white'
        }
      }
    }
  })

  return (
    <ThemeProvider value={customTheme}>
      {' '}
      <Global
        styles={css`
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #2d2d2d;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb {
            background: #555;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #333;
          }
        `}
      />
      {props.children}
    </ThemeProvider>
  )
}
