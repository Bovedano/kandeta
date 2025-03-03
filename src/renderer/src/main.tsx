import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { EditorPanel } from '@renderer/components/Editor/EditorPanel/EditorPanel'
import { GlobalContext } from '@renderer/context/GlobalContext'
import { GlobalToolsRegister } from '@renderer/Tools/GlobalToolsRegister'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalContext>
      <GlobalToolsRegister />
      <EditorPanel />
    </GlobalContext>
  </React.StrictMode>
)
