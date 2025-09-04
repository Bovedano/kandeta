import { createContext, useContext, ReactNode, useState } from 'react'

interface FilterContextType {
  filter: string
  setFilter: (filter: string) => void
  clearFilter: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

interface FilterProviderProps {
  children: ReactNode
}

export const FilterProvider = ({ children }: FilterProviderProps): JSX.Element => {
  const [filter, setFilter] = useState<string>('')

  const clearFilter = (): void => {
    setFilter('')
  }

  return (
    <FilterContext.Provider value={{ filter, setFilter, clearFilter }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider')
  }
  return context
}
