import { FormStateElement } from '@renderer/Tools/LanguageConfig/LanguageConfig'
import { LanguageListItem } from '@renderer/Tools/LanguageConfig/LanguageListItem/LanguageListItem'
import { getLanguages } from '@renderer/config/languages'
import { FilesFormats, LanguageDefinition } from '@renderer/core/domain'
import { Pane } from 'evergreen-ui'
import { useEffect } from 'react'

interface LanguageListProps {
  files_format: FilesFormats
  value: FormStateElement[]
  onChange: (value: FormStateElement[]) => void
  idSelected: string
  onSelectedChange: (idSelected: string) => void
}

export const LanguageList = (props: LanguageListProps): JSX.Element => {
  const languages = getLanguages()

  useEffect(() => {
    console.log('value', props.value)
  }, [props.value])

  const onChangeHandler = (language: LanguageDefinition, newValue: string): void => {
    const itemState = props.value.find((item) => item.language.id === language.id)

    if (itemState) {
      itemState.value = newValue
      props.onChange([...props.value])
    } else {
      props.onChange([
        ...props.value,
        {
          language: language,
          value: newValue
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
            isDefault={lang.id === props.idSelected}
            value={itemState ? itemState.value : ''}
            onChange={onChangeHandler}
            onSelect={() => props.onSelectedChange(lang.id)}
          />
        )
      })}
    </Pane>
  )
}
