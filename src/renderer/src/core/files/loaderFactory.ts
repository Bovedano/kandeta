import { FilesFormats, FormatModule } from '@renderer/core/domain'
import { jsonSeparatedFilesGenerator } from '@renderer/core/files/json-separated-files/generator'
import { jsonSeparatedFilesLoader } from '@renderer/core/files/json-separated-files/loader'
import { jsonSeparatedFilesSaver } from '@renderer/core/files/json-separated-files/saver'

export const getLoader = (file_format: FilesFormats): FormatModule => {
  if (file_format === 'json-separated-files') {
    return {
      loader: jsonSeparatedFilesLoader,
      saver: jsonSeparatedFilesSaver,
      generator: jsonSeparatedFilesGenerator
    }
  }

  throw new Error('No loader found for the specified format')
}
