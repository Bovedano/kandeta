import { selectFile, readFile } from './modules/files'

export const setupIPC = (ipcMain): void => {
  ipcMain.handle('files:selectFile', selectFile)
  ipcMain.handle('files:readFile', readFile)
}
