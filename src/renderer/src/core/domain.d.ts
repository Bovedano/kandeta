export interface Project {
  file: string | undefined
  files: LanguageFile[]
  translation_info: TranslationInfo
}

export interface TranslationInfo {
  literals: Literal[]
  default_language_id: string
}

export interface Literal {
  id: string
  translations: Translation[]
}

export interface Translation {
  language: string
  text: string
}

export interface LanguageDefinition {
  id: string
  name: string
  subname: string
}

export interface LanguageFile {
  language_id: string
  language_file: string
  is_default: boolean
}
