import { ProjectProvider } from '@renderer/context/useVInspectorSelectionContext'
import { EvergreenCustomizer } from '@renderer/theme/EvergreenCustomizer/EvergreenCustomizer'
import { ThemeProvider } from '@renderer/theme/useThemeContext'

interface GlobalContextProps {
  children: React.ReactElement | React.ReactElement[]
}

export const GlobalContext = (props: GlobalContextProps): JSX.Element => {
  return (
    <ThemeProvider>
      <EvergreenCustomizer>
        <ProjectProvider>{props.children}</ProjectProvider>
      </EvergreenCustomizer>
    </ThemeProvider>
  )
}
