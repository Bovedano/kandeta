import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { EditorPanel } from '@renderer/components/Editor/EditorPanel/EditorPanel'
import { GlobalContext } from '@renderer/context/GlobalContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalContext>
      <EditorPanel />
    </GlobalContext>
  </React.StrictMode>
)
