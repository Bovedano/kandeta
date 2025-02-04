import { dialog } from 'electron'
import { readFileSync } from 'fs'

export const selectFile = async (): Promise<string> => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'] // 'openFile' permite seleccionar un solo archivo
  })

  return result.filePaths[0]
}

export const readFile = async (_event, path): Promise<string> => {
  return readFileSync(path, 'utf8')
}
