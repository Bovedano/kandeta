import { Literal, Tag, TranslationInfo } from '@renderer/core/domain'

export const getFilterTags = (translationInfo: TranslationInfo | undefined): Tag[] => {
  if (translationInfo) {
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
  return []
}

export const filterLiterals = (
  translationInfo: TranslationInfo | undefined,
  filter: string
): Literal[] => {
  if (translationInfo) {
    const tag = getFilterTags(translationInfo).find((tag) => tag.id === filter)

    if (tag) {
      return tag.filter(translationInfo.literals)
    }

    return filterIdAndText(translationInfo.literals, filter)
  }
  return []
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
