import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { EditorPanel } from '@renderer/components/Editor/EditorPanel/EditorPanel'
import { GlobalContext } from '@renderer/context/GlobalContext'
import { GlobalToolsRegister } from '@renderer/Tools/GlobalToolsRegister'
import { ErrorProvider } from '@renderer/core/context/ErrorContext'
import { FilterProvider } from '@renderer/context/useFilterContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorProvider>
      <FilterProvider>
        <GlobalContext>
          <GlobalToolsRegister />
          <EditorPanel />
        </GlobalContext>
      </FilterProvider>
    </ErrorProvider>
  </React.StrictMode>
)
