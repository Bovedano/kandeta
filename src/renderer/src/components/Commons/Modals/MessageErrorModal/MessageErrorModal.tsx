import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { useThemeContext } from '@renderer/theme/useThemeContext'
import { Pane, Button } from 'evergreen-ui'

interface MessageErrorModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
  details?: string
}

export const MessageErrorModal = (props: MessageErrorModalProps): JSX.Element => {
  const { theme } = useThemeContext()

  if (!props.isOpen) return <></>

  return (
    <>
      {/* Overlay */}
      <Pane
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="rgba(0, 0, 0, 0.5)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={1000}
        onClick={props.onClose}
      >
        {/* Modal Content */}
        <Pane
          background={theme.backgrounds.modals}
          borderRadius={8}
          padding={24}
          minWidth={400}
          maxWidth={600}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
        >
          {/* Header */}
          <CText fontSize={18} fontWeight="bold" marginBottom={16} color="#ff4757" display="block">
            {props.title || 'Error'}
          </CText>

          {/* Message */}
          <CText fontSize={16} marginBottom={props.details ? 16 : 24} display="block">
            {props.message}
          </CText>

          {/* Details */}
          {props.details && (
            <CText fontSize={14} marginBottom={24} opacity={0.8} display="block">
              <strong>Detalles:</strong> {props.details}
            </CText>
          )}

          {/* Button */}
          <Pane display="flex" justifyContent="flex-end">
            <Button intent="danger" onClick={props.onClose}>
              Acept
            </Button>
          </Pane>
        </Pane>
      </Pane>
    </>
  )
}
