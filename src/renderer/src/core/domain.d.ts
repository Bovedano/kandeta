export type FilesFormats = 'json-separated-files'
export interface Project {
  file: string | undefined
  files_format: FilesFormats
  files: LanguageFile[]
  translation_info?: TranslationInfo
}

export interface TranslationInfo {
  literals: Literal[]
  default_language_id: string
  included_language_ids: string[]
}

export interface Literal {
  id: string
  is_modified: boolean
  translations: Translation[]
}

export interface Translation {
  language_id: string
  text: string
}

export interface LanguageDefinition {
  id: string
  name: string
  subname: string
}

// Modulo de carga
type FMLoader = (lfiles: LanguageFile[]) => Promise<LanguageLoaded[]>
type FMGenerator = () => {
  content: string
  extension: string
}

interface FormatModule {
  loader: FMLoader
  generator: FMGenerator
}

export interface LanguageFile {
  language_id: string
  language_file: string
  is_default: boolean
}

export interface LanguageLoaded {
  language_id: string
  info: Record<string, string>
}
