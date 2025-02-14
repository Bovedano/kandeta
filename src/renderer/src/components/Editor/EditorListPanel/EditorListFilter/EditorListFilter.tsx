import { Pane, TextInput } from 'evergreen-ui'
import { LuCaseSensitive } from 'react-icons/lu'
import { BsRegex } from 'react-icons/bs'
import { IoMdArrowDropdown } from 'react-icons/io'
import { Icon } from '@renderer/components/Commons/Icon/Icon'

interface EditorListFilterProps {
  filter: string
  onFilterChange: (filter: string) => void
}

export const EditorListFilter = (props: EditorListFilterProps): JSX.Element => {
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
        <Icon icon={IoMdArrowDropdown} b_hover cursor="pointer" />
      </Pane>
      <Pane
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
        width={'calc(100% - ' + iconSize * nIcons + 'px)'}
      >
        <TextInput
          height="100%"
          width="100%"
          borderRadius="0px"
          placeholder="Id, text, regular expression"
          value={props.filter}
          onChange={(ev) => props.onFilterChange(ev.target.value)}
        />
      </Pane>
      <Pane
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
        width={iconSize + 'px'}
      >
        <Icon icon={LuCaseSensitive} b_hover cursor="pointer" />
      </Pane>
      <Pane
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
        width={iconSize + 'px'}
      >
        <Icon icon={BsRegex} b_hover cursor="pointer" />
      </Pane>
    </Pane>
  )
}
