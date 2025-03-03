import { Literal, Tag, TranslationInfo } from '@renderer/core/domain'

export const getFilterTags = (translationInfo: TranslationInfo): Tag[] => {
  const filterTags: Tag[] = [
    {
      id: '[NOT TRANSLATED]',
      filter: (literals: Literal[]) =>
        literals.filter((lit) => !!lit.translations.find((trans) => !trans.text))
    },
    {
      id: '[EMPTY]',
      filter: (literals: Literal[]) =>
        literals.filter((lit) => {
          const defaultTranslation = lit.translations.find(
            (trans) => trans.language_id === translationInfo.default_language_id
          )
          console.log('filtered', translationInfo)
          return !defaultTranslation?.text
        })
    }
  ]
  return filterTags
}

export const filterLiterals = (translationInfo: TranslationInfo, filter: string): Literal[] => {
  const tag = getFilterTags(translationInfo).find((tag) => tag.id === filter)

  if (tag) {
    return tag.filter(translationInfo.literals)
  }

  return filterIdAndText(translationInfo.literals, filter)
}

export const filterIdAndText = (literals: Literal[], filter: string): Literal[] => {
  const filteredLiterals = literals.filter((literal) => {
    if (literal.id.toUpperCase().includes(filter.toUpperCase())) {
      return literal
    }
    const translation = literal.translations.find((trans) =>
      trans.text.toUpperCase().includes(filter.toUpperCase())
    )
    if (translation) {
      return literal
    }
    return undefined
  })

  return filteredLiterals
}
