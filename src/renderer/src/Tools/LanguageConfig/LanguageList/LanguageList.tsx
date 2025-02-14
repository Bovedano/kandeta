import { FormStateElement } from '@renderer/Tools/LanguageConfig/LanguageConfig'
import { LanguageListItem } from '@renderer/Tools/LanguageConfig/LanguageListItem/LanguageListItem'
import { getLanguages } from '@renderer/config/languages'
import { FilesFormats, LanguageDefinition } from '@renderer/core/domain'
import { Pane } from 'evergreen-ui'

interface LanguageListProps {
  files_format: FilesFormats
  value: FormStateElement[]
  onChange: (value: FormStateElement[]) => void
}

export const LanguageList = (props: LanguageListProps): JSX.Element => {
  const languages = getLanguages()

  const onChangeHandler = (
    language: LanguageDefinition,
    newValue: string,
    isDefault: boolean
  ): void => {
    const itemState = props.value.find((item) => item.language.id === language.id)
    if (itemState) {
      itemState.value = newValue
      itemState.isDefault = isDefault
      props.onChange([...props.value])
    } else {
      props.onChange([
        ...props.value,
        {
          language: language,
          value: newValue,
          isDefault: isDefault
        }
      ])
    }
  }

  return (
    <Pane display="flex" width="100%" flexDirection="column" rowGap="10px">
      {languages.map((lang) => {
        const itemState = props.value.find((item) => item.language.id === lang.id)
        return (
          <LanguageListItem
            files_format={props.files_format}
            key={lang.id}
            language={lang}
            isDefault={!!itemState?.isDefault}
            value={itemState ? itemState.value : ''}
            onChange={onChangeHandler}
          />
        )
      })}
    </Pane>
  )
}
