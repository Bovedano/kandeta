import { DefaultTheme, ThemeProvider, defaultTheme, mergeTheme } from 'evergreen-ui'
interface EvergreenCustomizerProps {
  children: JSX.Element
}

export const EvergreenCustomizerToobars = (props: EvergreenCustomizerProps): JSX.Element => {
  const customTheme: DefaultTheme = mergeTheme(defaultTheme, {
    components: {
      Pane: {
        baseStyle: {
          backgroundColor: '#121212'
        }
      }
    }
  })

  return <ThemeProvider value={customTheme}>{props.children}</ThemeProvider>
}
