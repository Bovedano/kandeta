import { SlottedComponent } from '@renderer/components/Commons/SlottedComponent/SlottedComponent'
import { EvergreenCustomizerToobars } from '@renderer/theme/EvergreenCustomizer/EvergreenCustomizerToolbars'
import { Pane } from 'evergreen-ui'
import sizes from '../../../theme/config/sizes.json'

interface EditorToolbarPanelLayoutProps {
  children: React.ReactElement[] | React.ReactElement
}

export const EditorToolbarPanelLayout = (props: EditorToolbarPanelLayoutProps): JSX.Element => {
  return (
    <Pane display="flex" height="100%" width="100%" flexDirection="column">
      <EvergreenCustomizerToobars>
        <Pane display="flex" paddingLeft="10px" height={sizes.toolbars.height + 'px'} width="100%">
          <SlottedComponent slot="toolbar">{props.children}</SlottedComponent>
        </Pane>
      </EvergreenCustomizerToobars>
      <Pane
        display="flex"
        maxHeight={'calc(100% - ' + sizes.toolbars.height + 'px)'}
        height={'calc(100% - ' + sizes.toolbars.height + 'px)'}
        width="100%"
      >
        <SlottedComponent slot="body">{props.children}</SlottedComponent>
      </Pane>
    </Pane>
  )
}
