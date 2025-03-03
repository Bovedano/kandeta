import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { Icon } from '@renderer/components/Commons/Icon/Icon'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { getFilterTags } from '@renderer/core/literals/filter'
import { EvergreenCustomizerMenus } from '@renderer/theme/EvergreenCustomizer/EvergreenCustomizerMenus'
import { Pane, Popover, Position } from 'evergreen-ui'
import { useEffect, useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'

const HEVENT = 'menu_item_extra_hovered_custom_event'

interface EditorListTagsProps {
  id: string
  onTagSelected: (tag: string) => void
}

const sendOpenEvent = (id): void => {
  const event = new CustomEvent(HEVENT, {
    detail: {
      id: id
    }
  })
  window.dispatchEvent(event)
}

export const EditorListTags = (props: EditorListTagsProps): JSX.Element => {
  const { project } = useProjectContext()

  const menu_id = 'menu_filter_tag_selector'
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onOpenEventHandler = (ev): void => {
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
            width={240}
            height="fit-content"
            display="flex"
            alignItems="start"
            justifyContent="start"
            flexDirection="column"
            paddingY="15px"
            paddingX="20px"
            rowGap="15px"
          >
            {getFilterTags(project.translation_info).map((tag, i) => (
              <CText
                key={'tat_' + i}
                b_hover
                cursor={'pointer'}
                onClick={() => props.onTagSelected(tag.id)}
                className={'noSelectable'}
              >
                {tag.id}
              </CText>
            ))}
          </Pane>
        </EvergreenCustomizerMenus>
      }
      position={Position.BOTTOM_LEFT}
      isShown={isOpen}
    >
      <Pane display="flex" height="100%" alignItems="center">
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
