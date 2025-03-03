import { useSelectedLiteralContext } from '@renderer/context/useSelectedLiteralContext'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { Literal } from '@renderer/core/domain'
import { Pane } from 'evergreen-ui'
import { useMemo } from 'react'
import { EditorDetailToolbar } from '@renderer/components/Editor/EditorDetaillPanel/EditorDetailToolbar/EditorDetailToolbar'
import { EditorDetailTranslation } from '@renderer/components/Editor/EditorDetaillPanel/EditorDetailTranslation/EditorDetailTranslation'
import { EmptyPanelState } from '@renderer/components/Commons/EmptyPanelState/EmptyPanelState'
import { EditorToolbarPanelLayout } from '@renderer/components/Editor/EditorToolbarPanelLayout/EditorToolbarPanelLayout'
import {
  addLiteralToTranslationInfo,
  findLiteralInProjectById
} from '@renderer/core/literals/literals'

export const EditorDetaillPanel = (): JSX.Element => {
  const { project, setProject } = useProjectContext()
  const { literal_id } = useSelectedLiteralContext()

  const literal: Literal | undefined = useMemo(() => {
    return findLiteralInProjectById(literal_id, project.translation_info)
  }, [literal_id, project])

  const ordered_files = useMemo(() => {
    const sorted = project.files.sort((a, b) => {
      if (a.language_id === project.translation_info.default_language_id) {
        return -1
      }
      if (b.language_id === project.translation_info.default_language_id) {
        return 1
      }
      return a.language_id.localeCompare(b.language_id)
    })
    console.log('sorted', sorted)
    return sorted
  }, [project, project.translation_info, project.translation_info.default_language_id])

  if (project.files.length == 0) {
    return (
      <EditorToolbarPanelLayout>
        <Pane slot="toolbar"></Pane>
        <EmptyPanelState text="There is no language selected" slot="body" />
      </EditorToolbarPanelLayout>
    )
  }

  if (!literal) {
    return (
      <EditorToolbarPanelLayout>
        <Pane slot="toolbar"></Pane>
        <EmptyPanelState text="Select a translation" slot="body" />
      </EditorToolbarPanelLayout>
    )
  }

  return (
    <EditorToolbarPanelLayout>
      <EditorDetailToolbar slot="toolbar" literal={literal} />
      <Pane
        slot="body"
        display="flex"
        flexDirection="column"
        height="100%"
        width="100%"
        overflow="auto"
        padding="10px"
      >
        <Pane display="flex" flexDirection="column" height="fit-content" rowGap="15px">
          {ordered_files.map((file) => (
            <EditorDetailTranslation
              key={file.language_id}
              language_id={file.language_id}
              default_language={project.translation_info.default_language_id}
              literal={literal}
              onChangeValue={(value: string) => {
                if (project.translation_info) {
                  addLiteralToTranslationInfo(
                    project.translation_info,
                    file.language_id,
                    literal.id,
                    value,
                    true
                  )
                  setProject(project)
                }
              }}
            />
          ))}
        </Pane>
      </Pane>
    </EditorToolbarPanelLayout>
  )
}
