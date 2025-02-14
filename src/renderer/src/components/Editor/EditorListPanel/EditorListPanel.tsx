import { EditorListFilter } from '@renderer/components/Editor/EditorListPanel/EditorListFilter/EditorListFilter'
import { EditorListItem } from '@renderer/components/Editor/EditorListPanel/EditorListItem/EditorListItem'
import { useSelectedLiteralContext } from '@renderer/context/useSelectedLiteralContext'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { Pane } from 'evergreen-ui'
import { useMemo, useState } from 'react'
import sizes from '../../../theme/config/sizes.json'

export const EditorListPanel = (): JSX.Element => {
  const { project } = useProjectContext()
  const { literal_id, setLiteral_id } = useSelectedLiteralContext()
  const [filter, setFilter] = useState<string>('')

  const filteredLiterals = useMemo(() => {
    if (project.translation_info?.literals) {
      return project.translation_info.literals.filter((literal) => {
        if (literal.id.includes(filter)) {
          return literal
        }
        const translation = literal.translations.find((trans) => trans.text.includes(filter))
        if (translation) {
          return literal
        }
      })
    }
    return []
  }, [project.translation_info?.literals, filter])

  if (!project.translation_info) {
    return <></>
  }

  return (
    <Pane height="100%" width="100%" flexDirection="column">
      <Pane height={sizes.toolbars.height + 'px'} width="100%">
        <EditorListFilter filter={filter} onFilterChange={setFilter} />
      </Pane>
      <Pane
        display="flex"
        flexDirection="column"
        maxHeight={'calc(100% - ' + sizes.toolbars.height + 'px)'}
        height={'calc(100% - ' + sizes.toolbars.height + 'px)'}
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
    </Pane>
  )
}
