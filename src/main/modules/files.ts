import { dialog, app } from 'electron'
import { readFileSync, writeFileSync } from 'fs'

export const selectFile = async (): Promise<string> => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'] // 'openFile' permite seleccionar un solo archivo
  })

  return result.filePaths[0]
}

export const selectNewFile = async (
  _event,
  defaultName: string,
  content: string
): Promise<string | undefined> => {
  const result = await dialog.showSaveDialog({
    title: 'Create new file',
    buttonLabel: 'Create',
    defaultPath: defaultName, // Nombre por defecto
    filters: [{ name: 'Text Files', extensions: [] }] // Filtros opcionales
  })

  if (!result.canceled && result.filePath) {
    writeFileSync(result.filePath, content, 'utf8')
    return result.filePath
  }

  return undefined
}

export const readFile = async (_event, path): Promise<string> => {
  return readFileSync(path, 'utf8')
}

export const writeFile = async (_event, path: string, content: string): Promise<void> => {
  writeFileSync(path, content, 'utf8')
}

export const getAppDir = async (): Promise<string> => {
  return app.getPath('userData')
}
