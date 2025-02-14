import { selectFile, readFile, selectNewFile, writeFile } from './modules/files'

export const setupIPC = (ipcMain): void => {
  ipcMain.handle('files:selectFile', selectFile)
  ipcMain.handle('files:readFile', readFile)
  ipcMain.handle('files:selectNewFile', selectNewFile)
  ipcMain.handle('files:writeFile', writeFile)
}
