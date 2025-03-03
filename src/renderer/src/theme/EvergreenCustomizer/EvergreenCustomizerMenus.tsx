import { DefaultTheme, ThemeProvider, defaultTheme, mergeTheme } from 'evergreen-ui'
interface EvergreenCustomizerProps {
  children: JSX.Element
}

export const EvergreenCustomizerMenus = (props: EvergreenCustomizerProps): JSX.Element => {
  const customTheme: DefaultTheme = mergeTheme(defaultTheme, {
    components: {
      Pane: {
        baseStyle: {
          backgroundColor: '#2d2d2d',
          border: 'solid 2px white',
          borderRadius: '5px'
        }
      }
    }
  })

  return <ThemeProvider value={customTheme}>{props.children}</ThemeProvider>
}
