import { createContext, useContext, useState, ReactNode } from 'react'
import { MessageErrorModal } from '@renderer/components/Commons/Modals/MessageErrorModal/MessageErrorModal'

interface ErrorInfo {
  title?: string
  message: string
  details?: string
}

interface ErrorContextType {
  showError: (error: ErrorInfo) => void
  showSimpleError: (message: string, details?: string) => void
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined)

interface ErrorProviderProps {
  children: ReactNode
}

export const ErrorProvider = ({ children }: ErrorProviderProps): JSX.Element => {
  const [currentError, setCurrentError] = useState<ErrorInfo | null>(null)

  const showError = (error: ErrorInfo): void => {
    setCurrentError(error)
    console.error('Error:', error.message, error.details)
  }

  const showSimpleError = (message: string, details?: string): void => {
    setCurrentError({ message, details })
    console.error('Error:', message, details)
  }

  const hideError = (): void => {
    setCurrentError(null)
  }

  return (
    <ErrorContext.Provider value={{ showError, showSimpleError }}>
      {children}
      <MessageErrorModal
        isOpen={!!currentError}
        onClose={hideError}
        title={currentError?.title}
        message={currentError?.message || ''}
        details={currentError?.details}
      />
    </ErrorContext.Provider>
  )
}

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext)
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}
