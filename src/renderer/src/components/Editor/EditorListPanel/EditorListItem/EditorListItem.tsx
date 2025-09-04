import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { Icon } from '@renderer/components/Commons/Icon/Icon'
import { Literal } from '@renderer/core/domain'
import { EvergreenCustomizerMenus } from '@renderer/theme/EvergreenCustomizer/EvergreenCustomizerMenus'
import { useDeleteTranslationDialog } from '@renderer/Tools/hooks/useDeleteTranslationDialog'
import { useDuplicateTranslationInput } from '@renderer/Tools/hooks/useDuplicateTranslationInput'
import { useNewTranslationInput } from '@renderer/Tools/hooks/useNewTranslationInput'
import { useRenameTranslationInput } from '@renderer/Tools/hooks/useRenameTranslationInput'
import { Pane, Popover, Position } from 'evergreen-ui'
import { useEffect, useState, forwardRef } from 'react'
import { FaCheck } from 'react-icons/fa6'

interface EditorListItemProps {
  literal: Literal
  isSelected: boolean
  onSelect: (id: string) => void
}

const HEVENT = 'list_item_hovered_custom_event'

export const EditorListItem = forwardRef<HTMLDivElement, EditorListItemProps>(
  (props, ref): JSX.Element => {
    const menu_id = 'custom_menu_id_' + props.literal.id
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const newTranslationInputController = useNewTranslationInput()
    const renameTranslationInputController = useRenameTranslationInput()
    const deleteTranslationDialogController = useDeleteTranslationDialog()
    const duplicateTranslationInputController = useDuplicateTranslationInput()

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

    const sendOpenEvent = (id): void => {
      const event = new CustomEvent(HEVENT, {
        detail: {
          id: id
        }
      })
      window.dispatchEvent(event)
    }

    const onOpenEventHandler = (ev): void => {
      if (ev.detail.id !== props.literal.id) {
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
      props.onSelect(props.literal.id)
      setIsOpen(true)
      sendOpenEvent(props.literal.id)
    }

    return (
      <div ref={ref}>
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
                <CText
                  b_hover
                  cursor={'pointer'}
                  onClick={() => newTranslationInputController.open({})}
                  className={'noSelectable'}
                >
                  New
                </CText>
                <CText
                  b_hover
                  cursor={'pointer'}
                  onClick={() =>
                    renameTranslationInputController.open({
                      idLiteralToRename: props.literal.id
                    })
                  }
                  className={'noSelectable'}
                >
                  Rename
                </CText>
                <CText
                  b_hover
                  cursor={'pointer'}
                  onClick={() =>
                    duplicateTranslationInputController.open({
                      idLiteralToDuplicate: props.literal.id
                    })
                  }
                  className={'noSelectable'}
                >
                  Duplicate
                </CText>
                <CText
                  b_hover
                  cursor={'pointer'}
                  onClick={() =>
                    deleteTranslationDialogController.open({
                      idLiteralToDelete: props.literal.id
                    })
                  }
                  className={'noSelectable'}
                >
                  Delete
                </CText>
              </Pane>
            </EvergreenCustomizerMenus>
          }
          position={Position.BOTTOM_LEFT}
          isShown={isOpen}
        >
          <Pane
            display="flex"
            columnGap="5px"
            alignItems="center"
            paddingLeft="15px"
            onAuxClick={onClickHandler}
          >
            <Pane flexShrink={0}>
              <Icon icon={FaCheck} fontSize={'small'} />
            </Pane>
            <CText
              b_selected={props.isSelected}
              fontWeight={props.isSelected ? 'bold' : 'normal'}
              size="small"
              cursor="pointer"
              onClick={() => props.onSelect(props.literal.id)}
            >
              {props.literal.id}
            </CText>
          </Pane>
        </Popover>
      </div>
    )
  }
)

EditorListItem.displayName = 'EditorListItem'
