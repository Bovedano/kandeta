import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { Icon } from '@renderer/components/Commons/Icon/Icon'
import { SubMenu } from '@renderer/components/Commons/Menu/MenuItem/MenuItem'
import { EvergreenCustomizerMenus } from '@renderer/theme/EvergreenCustomizer/EvergreenCustomizerMenus'
import { Pane, Popover, Position } from 'evergreen-ui'
import { useEffect, useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'

const HEVENT = 'menu_item_extra_hovered_custom_event'

interface MenuItemExtraProps {
  id: string
  submenus: SubMenu[][]
}

const sendOpenEvent = (id): void => {
  const event = new CustomEvent(HEVENT, {
    detail: {
      id: id
    }
  })
  window.dispatchEvent(event)
}

export const MenuItemExtra = (props: MenuItemExtraProps): JSX.Element => {
  const menu_id = 'custom_menu_id_' + props.id
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onOpenEventHandler = (ev): void => {
    console.log(ev.detail.id)
    if (ev.detail.id !== props.id) {
      setIsOpen(false)
    }
  }

  const onExternalClickHandler = (ev): void => {
    try {
      if (!ev.target.className.includes(menu_id)) {
        setIsOpen(false)
      }
    } catch {
      //Nothing
    }
  }

  const onClickHandler = (): void => {
    setIsOpen(true)
    sendOpenEvent(props.id)
  }

  useEffect(() => {
    window.removeEventListener(HEVENT, onOpenEventHandler)
    window.removeEventListener('click', onExternalClickHandler)

    window.addEventListener(HEVENT, onOpenEventHandler)
    window.addEventListener('click', onExternalClickHandler)
    return (): void => {
      window.removeEventListener(HEVENT, onOpenEventHandler)
      window.removeEventListener('click', onExternalClickHandler)
    }
  }, [])

  return (
    <Popover
      content={
        <EvergreenCustomizerMenus>
          <Pane
            className={menu_id}
            width={'fit-content'}
            minWidth={240}
            height="fit-content"
            display="flex"
            alignItems="start"
            justifyContent="start"
            flexDirection="column"
            paddingY="15px"
            paddingX="20px"
            rowGap="15px"
          >
            {props.submenus ? (
              props.submenus.map((group, i) => (
                <>
                  {i != 0 && <Pane width="100%" height="1px" opacity="50%" borderWidth="0.5px" />}
                  {group.map((smn, j) => (
                    <CText
                      key={'smn_' + i + '_' + j}
                      b_hover={!smn.isDisabled}
                      cursor={smn.isDisabled ? 'default' : 'pointer'}
                      opacity={smn.isDisabled ? '50%' : '100%'}
                      onClick={smn.isDisabled ? (): void => {} : (): void => smn.onClick()}
                      className={
                        smn.isDisabled
                          ? 'noSelectable nowraptext ' + menu_id
                          : 'noSelectable nowraptext'
                      }
                    >
                      {smn.label}
                    </CText>
                  ))}
                </>
              ))
            ) : (
              <></>
            )}
          </Pane>
        </EvergreenCustomizerMenus>
      }
      position={Position.BOTTOM_LEFT}
      isShown={isOpen}
    >
      <Pane height="fit-content">
        <Icon
          icon={IoMdArrowDropdown}
          size={20}
          cursor={'pointer'}
          onClick={onClickHandler}
          b_hover
        />
      </Pane>
    </Popover>
  )
}
