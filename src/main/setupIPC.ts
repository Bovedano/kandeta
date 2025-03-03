import { selectFile, readFile, selectNewFile, writeFile, getAppDir } from './modules/files'
import { request } from './modules/http'

export const setupIPC = (ipcMain): void => {
  ipcMain.handle('files:selectFile', selectFile)
  ipcMain.handle('files:readFile', readFile)
  ipcMain.handle('files:selectNewFile', selectNewFile)
  ipcMain.handle('files:writeFile', writeFile)
  ipcMain.handle('files:appDir', getAppDir)

  ipcMain.handle('http:request', request)
}
