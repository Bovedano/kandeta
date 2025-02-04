export const selectFile = (): Promise<string> => {
  return window.electron.ipcRenderer.invoke('files:selectFile')
}

export const readFile = (path: string): Promise<string> => {
  return window.electron.ipcRenderer.invoke('files:readFile', path)
}
