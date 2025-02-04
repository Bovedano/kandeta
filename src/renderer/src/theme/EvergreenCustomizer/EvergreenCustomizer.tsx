import { DefaultTheme, ThemeProvider, defaultTheme } from 'evergreen-ui'
import { Global, css } from '@emotion/react'
interface EvergreenCustomizerProps {
  children: JSX.Element
}

export const EvergreenCustomizer = (props: EvergreenCustomizerProps): JSX.Element => {
  const customTheme: DefaultTheme = {
    ...defaultTheme,
    components: {
      ...defaultTheme.components,
      DialogHeader: {
        ...defaultTheme.components.DialogHeader,
        baseStyle: {
          ...defaultTheme.components.DialogHeader.baseStyle,
          backgroundColor: '#2d2d2d',
          color: '#ffffff'
        }
      },
      DialogBody: {
        ...defaultTheme.components.DialogBody,
        baseStyle: {
          ...defaultTheme.components.DialogBody.baseStyle,
          backgroundColor: '#2d2d2d',
          color: '#ffffff'
        }
      },
      DialogFooter: {
        ...defaultTheme.components.DialogFooter,
        baseStyle: {
          ...defaultTheme.components.DialogFooter.baseStyle,
          backgroundColor: '#2d2d2d',
          color: '#ffffff'
        }
      }
    }
  }

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
