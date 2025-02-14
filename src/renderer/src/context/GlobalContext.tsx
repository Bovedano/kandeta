import { SelectedLiteralProvider } from '@renderer/context/useSelectedLiteralContext'
import { ToolsProvider } from '@renderer/context/useToolsContext'
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
        <ToolsProvider>
          <ProjectProvider>
            <SelectedLiteralProvider>{props.children}</SelectedLiteralProvider>
          </ProjectProvider>
        </ToolsProvider>
      </EvergreenCustomizer>
    </ThemeProvider>
  )
}
