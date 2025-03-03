export class FileLoadError extends Error {
  failedFiles: string[]

  constructor(failedFiles: string[]) {
    super(`Falló la carga de los siguientes archivos: ${failedFiles.join(', ')}`)
    this.failedFiles = failedFiles
  }
}
