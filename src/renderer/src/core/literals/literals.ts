import { Literal, TranslationInfo } from '@renderer/core/domain'
import { addTranlationToLiteral } from '@renderer/core/literals/literals_translations'

//TODO: Move to literals_translations and change name
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

export const findLiteralInProjectById = (
  id: string,
  translation_info: TranslationInfo
): Literal | undefined => {
  return translation_info.literals.find((lit) => lit.id === id)
}

export const renameLiteral = (
  oldKey: string,
  newKey: string,
  translation_info: TranslationInfo
): TranslationInfo => {
  const literal = findLiteralInProjectById(oldKey, translation_info)
  if (literal) {
    literal.id = newKey
  } else {
    throw new Error('Literal not found')
  }
  return translation_info
}

export const deleteLiteral = (
  literalId: string,
  translation_info: TranslationInfo
): TranslationInfo => {
  translation_info.literals = translation_info.literals.filter((lit) => lit.id !== literalId)
  return translation_info
}

export const duplicarteLiteral = (
  oldKey: string,
  newKey: string,
  translation_info: TranslationInfo
): TranslationInfo => {
  const literal = findLiteralInProjectById(oldKey, translation_info)
  if (literal) {
    const newLiteral: Literal = JSON.parse(JSON.stringify(literal))
    newLiteral.id = newKey
    translation_info.literals.push(newLiteral)
  } else {
    throw new Error('Literal not found')
  }
  return translation_info
}
