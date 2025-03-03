import { FMGenerator } from '@renderer/core/domain'

export const jsonSeparatedFilesGenerator: FMGenerator = () => {
  return {
    content: '{}',
    extension: 'json'
  }
}
