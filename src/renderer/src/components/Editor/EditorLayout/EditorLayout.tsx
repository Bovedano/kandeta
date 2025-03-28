import { Pane } from 'evergreen-ui'
import { Menu } from '../../Menu/Menu'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Separator } from '@renderer/components/Commons/Separator/Separator'
import { EditorListPanel } from '@renderer/components/Editor/EditorListPanel/EditorListPanel'
import { EditorDetaillPanel } from '@renderer/components/Editor/EditorDetaillPanel/EditorDetaillPanel'

export const EditorLayout = (): JSX.Element => {
  const menuBarHeight = 0
  const menuHeight = 50

  return (
    <Pane
      display="flex"
      alignItems="start"
      height={'100%'}
      width="100%"
      flexDirection={'column'}
      minWidth="500px"
    >
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
      <Pane
        display="flex"
        width="100%"
        height={'calc(100% - ' + (menuHeight + menuBarHeight) + 'px)'}
        flexDirection="row"
      >
        <PanelGroup direction="horizontal">
          <Panel id="sidebar" minSize={25} order={1}>
            <EditorListPanel />
          </Panel>
          <PanelResizeHandle>
            <Separator opacity={50} />
          </PanelResizeHandle>
          <Panel minSize={25} order={2}>
            <EditorDetaillPanel />
          </Panel>
        </PanelGroup>
      </Pane>
    </Pane>
  )
}
