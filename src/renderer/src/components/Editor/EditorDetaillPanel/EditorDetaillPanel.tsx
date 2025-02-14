import { useSelectedLiteralContext } from '@renderer/context/useSelectedLiteralContext'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { Literal } from '@renderer/core/domain'
import { findLiteralInProjectById } from '@renderer/core/literals/find_literals'
import { Pane } from 'evergreen-ui'
import { useMemo } from 'react'
import sizes from '../../../theme/config/sizes.json'
import { EditorDetailToolbar } from '@renderer/components/Editor/EditorDetaillPanel/EditorDetailToolbar/EditorDetailToolbar'
import { EditorDetailTranslation } from '@renderer/components/Editor/EditorDetaillPanel/EditorDetailTranslation/EditorDetailTranslation'
import { addLiteralToTranslationInfo } from '@renderer/core/literals/literals_translations'

export const EditorDetaillPanel = (): JSX.Element => {
  const { project, setProject } = useProjectContext()
  const { literal_id } = useSelectedLiteralContext()

  const literal: Literal | undefined = useMemo(() => {
    return findLiteralInProjectById(literal_id, project)
  }, [literal_id])

  if (!project.translation_info) {
    return <>No project info</>
  }

  if (!literal) {
    return <>Select literal</>
  }

  return (
    <Pane height="100%" width="100%" flexDirection="column">
      <Pane paddingLeft="10px" height={sizes.toolbars.height + 'px'} width="100%">
        <EditorDetailToolbar literal={literal} />
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
          {project.files.map((file) => (
            <EditorDetailTranslation
              key={file.language_id}
              language_id={file.language_id}
              is_default={file.is_default}
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
    </Pane>
  )
}
