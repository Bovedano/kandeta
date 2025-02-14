import { Literal, Translation, TranslationInfo } from '@renderer/core/domain'

export const findLiteralById = (literals: Literal[], id: string): Literal | undefined => {
  return literals.find((literal) => literal.id === id)
}

export const addLiteralToTranslationInfo = (
  tinfo: TranslationInfo,
  language_id: string,
  lit_key: string,
  lit_value: string,
  is_modified: boolean
): void => {
  let literal: Literal | undefined = tinfo.literals.find((literal) => literal.id === lit_key)
  if (!literal) {
    literal = {
      id: lit_key,
      translations: [],
      is_modified
    }
    tinfo.literals.push(literal)
  }

  literal.is_modified = is_modified
  addTranlationToLiteral(literal, language_id, lit_value)
}

export const addTranlationToLiteral = (
  literal: Literal,
  language_id: string,
  lit_value: string
): void => {
  let translation: Translation | undefined = literal.translations.find(
    (trans) => trans.language_id === language_id
  )
  if (!translation) {
    translation = {
      language_id: language_id,
      text: ''
    }
    literal.translations.push(translation)
  }

  translation.text = lit_value
}

export const getLiteralTranslationValue = (
  literal: Literal,
  language_id: string,
  def_value: string | undefined
): string | undefined => {
  const trnsl = literal.translations.find((trans) => trans.language_id === language_id)
  if (trnsl) {
    return trnsl.text
  }
  return def_value
}
