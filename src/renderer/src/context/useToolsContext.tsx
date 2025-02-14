import React, { useContext, useState } from 'react'

interface ToolsProviderProps {
  children: React.ReactElement | React.ReactElement[]
}

interface ToolStatus {
  isOpen: boolean
  data: unknown
}

interface ToolsState {
  states: Record<string, ToolStatus>
}

interface ToolsContext {
  data: ToolsState
  setData(id: string, data: ToolStatus): void
}

const defContext: ToolsContext = {
  data: { states: {} },
  setData: () => undefined
}

const ctx = React.createContext<ToolsContext>(defContext)

export const ToolsProvider = (props: ToolsProviderProps): JSX.Element => {
  const [data, setData] = useState<ToolsState>({ states: {} })

  const setDataValue = (id: string, value: ToolStatus): void => {
    setData((prev) => ({
      ...prev,
      states: {
        ...prev.states,
        [id]: value
      }
    }))
  }

  const value = { data, setData: setDataValue }

  return <ctx.Provider value={value} {...props} />
}

export interface ToolsContextType<T> {
  data: T | undefined
  isOpen: boolean
  open: (value: T | undefined) => void
  close: () => void
}

export const useToolsContext = <T,>(id: string): ToolsContextType<T> => {
  const contexto = useContext(ctx)

  if (!contexto) {
    throw 'In order to use useToolsContext the component must be nested in the ToolsProvider'
  }

  const tstate: ToolStatus | undefined = contexto.data.states[id]

  const open = (value: T | undefined): void => contexto.setData(id, { data: value, isOpen: true })
  const close = (): void => contexto.setData(id, { data: undefined, isOpen: false })

  if (tstate) {
    const data = tstate.data as T | undefined
    return {
      isOpen: tstate.isOpen,
      data,
      open,
      close
    }
  }

  return {
    isOpen: false,
    data: undefined,
    open,
    close
  }
}
