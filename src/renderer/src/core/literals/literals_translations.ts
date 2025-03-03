import { Literal, Translation, TranslationInfo } from '@renderer/core/domain'

export const findLiteralById = (literals: Literal[], id: string): Literal | undefined => {
  return literals.find((literal) => literal.id === id)
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

interface GetLanguageOrderedTranslationsReturn {
  language_id: string
  translations: Array<{
    translation: Translation
    literal: Literal
  }>
}

export const getLanguageOrderedTranslations = (
  tinfo: TranslationInfo
): GetLanguageOrderedTranslationsReturn[] => {
  const result: Record<string, GetLanguageOrderedTranslationsReturn> = {}
  tinfo.literals.forEach((literal) => {
    literal.translations.forEach((translation) => {
      if (result[translation.language_id]) {
        result[translation.language_id].translations.push({
          translation: translation,
          literal: literal
        })
      } else {
        result[translation.language_id] = {
          language_id: translation.language_id,
          translations: [
            {
              translation: translation,
              literal: literal
            }
          ]
        }
      }
    })
  })

  return Object.keys(result).map((key) => result[key])
}

export const getDefaultTranslationFromLiteral = (
  literal: Literal,
  default_language_id: string
): Translation | void => {
  return literal.translations.find((trans) => trans.language_id === default_language_id)
}
