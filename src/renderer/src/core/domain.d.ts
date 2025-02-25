export type FilesFormats = 'json-separated-files'
export interface Project {
  file: string | undefined
  files_format: FilesFormats
  files: LanguageFile[]
  translation_info?: TranslationInfo
  status?: ProjectStatus
  tm_configuration: TMConfig
}

export interface TMConfig {
  tm_configurations: TMConfiguration[]
  selected_tm: string
}

export interface ProjectStatus {
  saved: boolean
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
type FMSaver = (lfiles: LanguageFile[], languagesLoaded: LanguageLoaded[]) => Promise<boolean>
type FMGenerator = () => {
  content: string
  extension: string
}

interface FormatModule {
  loader: FMLoader
  saver: FMSaver
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

//Translation Modules

export interface TranslationModule {
  id: string
  name: string
  config: TranslationModuleConfig[]
  translate: (
    configuration: TMConfiguration[],
    id_language_origin: string,
    id_language_target: string,
    text
  ) => Promise<string>
}

export interface TranslationModuleConfig {
  id: string
  name: string
}

export interface TMConfiguration {
  id: string
  module_id: string
  value: string
}
