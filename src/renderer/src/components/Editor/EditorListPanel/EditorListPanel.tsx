import { EditorListFilter } from '@renderer/components/Editor/EditorListPanel/EditorListFilter/EditorListFilter'
import { EditorListItem } from '@renderer/components/Editor/EditorListPanel/EditorListItem/EditorListItem'
import { useSelectedLiteralContext } from '@renderer/context/useSelectedLiteralContext'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { Pane } from 'evergreen-ui'
import { useMemo, useState } from 'react'
import { EditorToolbarPanelLayout } from '@renderer/components/Editor/EditorToolbarPanelLayout/EditorToolbarPanelLayout'
import { EmptyPanelState } from '@renderer/components/Commons/EmptyPanelState/EmptyPanelState'
import { filterLiterals } from '@renderer/core/literals/filter'

export const EditorListPanel = (): JSX.Element => {
  const { project } = useProjectContext()
  const { literal_id, setLiteral_id } = useSelectedLiteralContext()
  const [filter, setFilter] = useState<string>('')

  const filteredLiterals = useMemo(() => {
    if (project.translation_info?.literals) {
      return filterLiterals(project.translation_info, filter).sort((a, b) =>
        a.id.localeCompare(b.id)
      )
    }
    return []
  }, [project, project.translation_info?.literals, filter])

  if (!project.translation_info) {
    return (
      <EditorToolbarPanelLayout>
        <Pane slot="toolbar"></Pane>
        <EmptyPanelState text="" slot="body" />
      </EditorToolbarPanelLayout>
    )
  }

  return (
    <EditorToolbarPanelLayout>
      <EditorListFilter slot="toolbar" filter={filter} onFilterChange={setFilter} />
      <Pane
        slot="body"
        display="flex"
        flexDirection="column"
        height="100%"
        width="100%"
        overflow="auto"
        padding="10px"
      >
        <Pane display="flex" flexDirection="column" height="fit-content" rowGap="5px">
          {filteredLiterals.map((literal) => {
            return (
              <EditorListItem
                onSelect={setLiteral_id}
                key={literal.id}
                literal={literal}
                isSelected={literal.id === literal_id}
              />
            )
          })}
        </Pane>
      </Pane>
    </EditorToolbarPanelLayout>
  )
}
