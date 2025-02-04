import { Pane, TextInput } from 'evergreen-ui'
import { useState } from 'react'
import { LuCaseSensitive } from 'react-icons/lu'
import { BsRegex } from 'react-icons/bs'
import { IoMdArrowDropdown } from 'react-icons/io'
import { Icon } from '@renderer/components/Commons/Icon/Icon'

export const EditorListFilter = (): JSX.Element => {
  const [value, setValue] = useState<string>('')
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
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
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
