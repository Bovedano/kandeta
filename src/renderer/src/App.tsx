import Versions from './components/Versions'
import { MdGamepad } from 'react-icons/md'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const onOpenFileHandler = (): void => {
    window.electron.ipcRenderer
      .invoke('files:openWithDialog')
      .then((openFiles: string[]) => {
        // Suponiendo que el proceso principal devuelve una lista de archivos
        console.log(openFiles) // Aquí se muestra la respuesta del proceso principal
      })
      .catch((error: Error) => {
        console.error('Error al abrir archivo:', error)
      })
  }

  return (
    <>
      <MdGamepad fontSize={'100px'} color="red" />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScriptss</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={onOpenFileHandler}>
            Read
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
