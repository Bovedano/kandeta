export const selectFile = (): Promise<string> => {
  return window.electron.ipcRenderer.invoke('files:selectFile')
}

export const readFile = (path: string): Promise<string> => {
  return window.electron.ipcRenderer.invoke('files:readFile', path)
}

export const selectNewFile = async (
  defaultName: string,
  content: string
): Promise<string | undefined> => {
  return window.electron.ipcRenderer.invoke('files:selectNewFile', defaultName, content)
}

export const writeFile = (path: string, content: string): Promise<string> => {
  return window.electron.ipcRenderer.invoke('files:writeFile', path, content)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = async <T>(config: any): Promise<T> => {
  return window.electron.ipcRenderer.invoke('http:request', config)
}
