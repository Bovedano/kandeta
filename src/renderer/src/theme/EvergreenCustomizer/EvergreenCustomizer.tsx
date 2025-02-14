import { DefaultTheme, ThemeProvider, defaultTheme, mergeTheme } from 'evergreen-ui'
import { Global, css } from '@emotion/react'
interface EvergreenCustomizerProps {
  children: JSX.Element
}

export const EvergreenCustomizer = (props: EvergreenCustomizerProps): JSX.Element => {
  const customTheme: DefaultTheme = mergeTheme(defaultTheme, {
    components: {
      Text: {
        baseStyle: {
          color: 'red'
        }
      },
      Pane: {
        baseStyle: {
          backgroundColor: '#2d2d2d',
          color: 'green'
        }
      },
      Code: {
        baseStyle: {
          backgroundColor: '#2d2d2d',
          color: 'green'
        }
      },
      Radio: {
        baseStyle: {
          backgroundColor: 'red',
          color: 'green'
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
