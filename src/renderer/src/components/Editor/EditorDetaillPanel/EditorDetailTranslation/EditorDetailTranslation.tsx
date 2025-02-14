import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { Literal } from '@renderer/core/domain'
import { getLiteralTranslationValue } from '@renderer/core/literals/literals_translations'
import { Pane, TextInput } from 'evergreen-ui'
import { useEffect, useRef, useState } from 'react'

interface EditorDetailTranslationProps {
  literal: Literal
  language_id: string
  is_default: boolean
  onChangeValue: (value: string) => void
}

export const EditorDetailTranslation = (props: EditorDetailTranslationProps): JSX.Element => {
  const [value, setValue] = useState<string | undefined>()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setValue(getLiteralTranslationValue(props.literal, props.language_id, ''))
  }, [props.literal.id])

  useEffect(() => {
    if (value !== undefined) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        console.log('change', value)
        props.onChangeValue(value)
      }, 50)
    }
  }, [value])

  return (
    <Pane display="flex" flexDirection="column" height="fit-content" rowGap="5px">
      <CText>
        {props.language_id} {props.is_default ? '(default)' : ''}
      </CText>
      <TextInput
        height="100%"
        width="100%"
        borderRadius="0px"
        placeholder="Id, text, regular expression"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
    </Pane>
  )
}
