import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { TranslatorBadge } from '@renderer/components/Commons/TranslatorBadge/TranslatorBadge'
import { useConfigContext } from '@renderer/context/useConfigContext'
import { TranslationModule } from '@renderer/core/domain'
import { modules } from '@renderer/core/translators/register'
import { EvergreenCustomizerMenus } from '@renderer/theme/EvergreenCustomizer/EvergreenCustomizerMenus'
import { Pane, Popover, Position } from 'evergreen-ui'
import { cloneElement, isValidElement, ReactNode, useState } from 'react'

interface TranslatorContextMenuProps {
  children: ReactNode
  selectedModuleId: string
}

export const TranslatorContextMenu = (props: TranslatorContextMenuProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { config, setConfig } = useConfigContext()

  const onSelectTranslator = (moduleId: string): void => {
    setConfig({
      ...config,
      tm_configuration: {
        ...config.tm_configuration,
        selected_tm: moduleId
      }
    })
    setIsOpen(false)
  }

  const renderTranslatorItem = (module: TranslationModule): JSX.Element => {
    const isSelected = module.id === props.selectedModuleId

    return (
      <Pane
        key={module.id}
        display="flex"
        alignItems="center"
        columnGap="10px"
        paddingY="8px"
        paddingX="12px"
        cursor="pointer"
        backgroundColor={isSelected ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
        borderRadius={4}
        border="none"
        boxShadow="none"
        outline="none"
        style={{ border: 'none', boxShadow: 'none', outline: 'none' }}
        onClick={(e) => {
          e.stopPropagation()
          onSelectTranslator(module.id)
        }}
      >
        <TranslatorBadge
          initials={module.initials}
          color={module.color}
          size={20}
          showBorder={false}
        />
        <CText fontWeight={isSelected ? 600 : 400}>{module.name}</CText>
      </Pane>
    )
  }

  const handleClick = (): void => {
    setIsOpen(!isOpen)
  }

  // Inyectar onClick en el children sin que el badge lo reciba como prop
  const childrenWithClick = isValidElement(props.children)
    ? cloneElement(props.children as React.ReactElement, {
        onClick: handleClick
      })
    : props.children

  return (
    <Popover
      content={
        <EvergreenCustomizerMenus>
          <Pane
            width="fit-content"
            minWidth={200}
            height="fit-content"
            display="flex"
            flexDirection="column"
            paddingY="8px"
            paddingX="4px"
          >
            {modules.map((module) => renderTranslatorItem(module))}
          </Pane>
        </EvergreenCustomizerMenus>
      }
      position={Position.BOTTOM_RIGHT}
      isShown={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Pane cursor="pointer">{childrenWithClick}</Pane>
    </Popover>
  )
}
