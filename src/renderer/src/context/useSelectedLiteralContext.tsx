import React, { useContext, useState } from 'react'

interface SelectedLiteralProviderProps {
  children: React.ReactElement | React.ReactElement[]
}

interface SelectedLiteralState {
  literal_id: string
}

interface SelectedLiteralContext extends SelectedLiteralState {
  setLiteral_id: (literal_id: string) => void
  setAll: (data: SelectedLiteralState) => void
}

const defContext: SelectedLiteralContext = {
  literal_id: '',
  setLiteral_id: () => {},
  setAll: () => {}
}

const ctx = React.createContext<SelectedLiteralContext>(defContext)

export const SelectedLiteralProvider = (props: SelectedLiteralProviderProps): JSX.Element => {
  const [data, setData] = useState<SelectedLiteralState>(defContext)

  const setLiteral_id = (literal_id: string): void => {
    setData({
      ...data,
      literal_id
    })
  }

  const value = {
    literal_id: data.literal_id,
    setLiteral_id,
    setAll: setData
  }

  return <ctx.Provider value={value} {...props} />
}

export const useSelectedLiteralContext = (): SelectedLiteralContext => {
  const contexto = useContext(ctx)

  if (!contexto) {
    throw 'Para utilizar useSelectedLiteralContext el componente debe estar anidado en el proveedor SelectedLiteralProvider'
  }

  return contexto
}
