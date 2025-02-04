import { EditorListFilter } from '@renderer/components/Editor/EditorListPanel/EditorListFilter/EditorListFilter'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { useThemeContext } from '@renderer/theme/useThemeContext'
import { Pane } from 'evergreen-ui'

export const EditorListPanel = (): JSX.Element => {
  const { theme } = useThemeContext()
  const { project } = useProjectContext()

  const filterHeight = 30
  return (
    <Pane height="100%" width="100%" flexDirection="column">
      <Pane height={filterHeight + 'px'} width="100%" backgroundColor={theme.backgrounds.toolbars}>
        <EditorListFilter />
      </Pane>
      <Pane
        height={'calc(100% - ' + filterHeight + 'px)'}
        width="100%"
        backgroundColor={theme.backgrounds.color}
      >
        {project.translation_info.literals.map((literal) => {
          return <>{literal.id}</>
        })}
      </Pane>
    </Pane>
  )
}
