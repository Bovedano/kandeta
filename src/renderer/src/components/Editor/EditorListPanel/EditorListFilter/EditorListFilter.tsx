import { Pane, TextInput } from 'evergreen-ui'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { Icon } from '@renderer/components/Commons/Icon/Icon'
import { useNewTranslationInput } from '@renderer/Tools/hooks/useNewTranslationInput'
import { EditorListTags } from '@renderer/components/Editor/EditorListPanel/EditorListTags/EditorListTags'

interface EditorListFilterProps {
  filter: string
  onFilterChange: (filter: string) => void
}

export const EditorListFilter = (props: EditorListFilterProps): JSX.Element => {
  const newTranslationInputController = useNewTranslationInput()
  const iconSize = 25
  const nIcons = 3

  return (
    <Pane height="100%" width="100%" justifyContent="center" flexDirection="row" display="flex">
      <Pane
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
        width={iconSize + 'px'}
      >
        <EditorListTags id="filtertags" onTagSelected={props.onFilterChange} />
      </Pane>
      <Pane
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
        width={'calc(100% - ' + iconSize * nIcons + 'px)'}
      >
        <TextInput
          size="small"
          width="100%"
          borderRadius="5px"
          placeholder="Id, text, tag"
          value={props.filter}
          onChange={(ev) => props.onFilterChange(ev.target.value)}
        />
      </Pane>
      <Pane
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
        width={iconSize * 2 + 'px'}
      >
        <Icon
          icon={IoIosAddCircleOutline}
          b_hover
          cursor="pointer"
          size={30}
          onClick={() => newTranslationInputController.open({ initialValue: props.filter })}
        />
      </Pane>
    </Pane>
  )
}
