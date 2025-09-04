import { EditorListFilter } from '@renderer/components/Editor/EditorListPanel/EditorListFilter/EditorListFilter'
import { EditorListItem } from '@renderer/components/Editor/EditorListPanel/EditorListItem/EditorListItem'
import { useSelectedLiteralContext } from '@renderer/context/useSelectedLiteralContext'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { useFilterContext } from '@renderer/context/useFilterContext'
import { Pane } from 'evergreen-ui'
import { useMemo, useRef, useEffect } from 'react'
import { EditorToolbarPanelLayout } from '@renderer/components/Editor/EditorToolbarPanelLayout/EditorToolbarPanelLayout'
import { filterLiterals } from '@renderer/core/literals/filter'

export const EditorListPanel = (): JSX.Element => {
  const { project } = useProjectContext()
  const { literal_id, setLiteral_id } = useSelectedLiteralContext()
  const { filter, setFilter } = useFilterContext()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const filteredLiterals = useMemo(() => {
    return filterLiterals(project.translation_info, filter).sort((a, b) => a.id.localeCompare(b.id))
  }, [project, project.translation_info.literals, filter])

  const scrollToLiteral = (literalId: string): void => {
    const element = itemRefs.current[literalId]
    const container = scrollContainerRef.current
    
    if (element && container) {
      // Obtener la posición del elemento relativa al contenedor
      const containerRect = container.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      
      // Calcular la posición de scroll necesaria
      const elementTop = elementRect.top - containerRect.top + container.scrollTop
      const containerHeight = container.clientHeight
      const elementHeight = elementRect.height
      
      // Centrar el elemento en el contenedor
      const targetScrollTop = elementTop - (containerHeight / 2) + (elementHeight / 2)
      
      // Hacer scroll suave
      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    if (literal_id) {
      // Pequeño delay para asegurar que el DOM se ha actualizado
      const timeoutId = setTimeout(() => {
        if (itemRefs.current[literal_id]) {
          scrollToLiteral(literal_id)
        }
      }, 100)

      return (): void => clearTimeout(timeoutId)
    }
  }, [literal_id, filteredLiterals])

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
        ref={scrollContainerRef}
      >
        <Pane display="flex" flexDirection="column" height="fit-content" rowGap="5px">
          {filteredLiterals.map((literal) => {
            return (
              <EditorListItem
                key={literal.id}
                ref={(el) => {
                  itemRefs.current[literal.id] = el
                }}
                onSelect={setLiteral_id}
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
