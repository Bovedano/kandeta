import { Pane } from 'evergreen-ui'
import { Menu } from '../Menu/Menu'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Separator } from '@renderer/components/Commons/Separator/Separator'
import { EditorListPanel } from '@renderer/components/Editor/EditorListPanel/EditorListPanel'

export const EditorLayout = (): JSX.Element => {
  const menuBarHeight = 0
  const menuHeight = 50

  return (
    <Pane display="flex" alignItems="start" height={'100%'} width="100%" flexDirection={'column'}>
      <Pane
        display="flex"
        alignItems="center"
        height={menuBarHeight + 'px'}
        width="100%"
        backgroundColor={'cyan'}
      ></Pane>
      <Pane display="flex" alignItems="center" height={menuHeight + 'px'} width="100%">
        <Menu />
      </Pane>
      {/* Contenedor de Split */}
      <Pane display="flex" flex={1} width="100%" flexDirection="row">
        <PanelGroup direction="horizontal">
          <Panel id="sidebar" minSize={25} order={1}>
            <EditorListPanel />
          </Panel>
          <PanelResizeHandle>
            <Separator />
          </PanelResizeHandle>
          <Panel minSize={25} order={2}>
            <>Dos</>
          </Panel>
        </PanelGroup>
      </Pane>
    </Pane>
  )
}
