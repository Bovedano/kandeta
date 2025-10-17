import { CText } from '@renderer/components/Commons/CComponents/CText/CText'
import { Icon } from '@renderer/components/Commons/Icon/Icon'
import { Literal } from '@renderer/core/domain'
import {
  getDefaultTranslationFromLiteral,
  getLiteralTranslationValue
} from '@renderer/core/literals/literals_translations'
import { getTranslationModule } from '@renderer/core/translators/register'
import { useError } from '@renderer/core/context/ErrorContext'
import { Pane, Spinner, TextInput } from 'evergreen-ui'
import { useEffect, useRef, useState } from 'react'
import { MdAutoAwesome } from 'react-icons/md'
import { MdClose } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa6'
import { useConfigContext } from '@renderer/context/useConfigContext'

interface EditorDetailTranslationProps {
  literal: Literal
  language_id: string
  default_language: string
  onChangeValue: (value: string) => void
}

export const EditorDetailTranslation = (props: EditorDetailTranslationProps): JSX.Element => {
  const [value, setValue] = useState<string | undefined>()
  const { showSimpleError } = useError()
  const [suggestion, setSuggestion] = useState<string | undefined>()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [inProcess, setInProcess] = useState<string>('')
  const { config } = useConfigContext()

  useEffect(() => {
    setValue(getLiteralTranslationValue(props.literal, props.language_id, ''))
    setSuggestion('')
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

  const onTranslateHandler = (): void => {
    const tm = getTranslationModule(config.tm_configuration.selected_tm)
    if (tm) {
      const defaultLiteral = getDefaultTranslationFromLiteral(props.literal, props.default_language)
      if (defaultLiteral && defaultLiteral.text) {
        setInProcess('Translating...')
        // Filter configurations for the selected translation module
        const filteredConfig = config.tm_configuration.tm_configurations.filter(
          (c) => c.module_id === tm.id
        )
        tm.translate(
          filteredConfig,
          props.default_language,
          props.language_id,
          defaultLiteral.text
        )
          .then((tt) => {
            setSuggestion(tt)
            setInProcess('')
          })
          .catch((err) => {
            setInProcess('')
            showSimpleError(
              'Translation failed',
              err instanceof Error ? err.message : 'An unknown error occurred during translation'
            )
          })
      } else {
        showSimpleError(
          'Default translation not found',
          'Could not find the default translation text to translate from.'
        )
      }
    } else {
      showSimpleError(
        'Translation module not found',
        'The selected translation service is not available or configured.'
      )
    }
  }
  const is_default = props.language_id === props.default_language

  const onAcceptSuggestion = (): void => {
    setValue(suggestion)
    setSuggestion('')
  }

  return (
    <Pane display="flex" flexDirection="column" height="fit-content" rowGap="10px">
      <CText>
        {props.language_id} {is_default ? '(default)' : ''}
      </CText>
      <Pane display="flex" alignItems="center" columnGap="10px">
        <TextInput
          height="100%"
          flex={1}
          borderRadius="5px"
          placeholder="Id, text, regular expression"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
        />
        {!is_default && (
          <Icon icon={MdAutoAwesome} b_hover cursor="pointer" onClick={onTranslateHandler} />
        )}
      </Pane>
      {inProcess && (
        <Pane display="flex" alignItems="center" columnGap="10px">
          <Spinner size={16} opacity="50%" />
          <CText opacity="50%">{inProcess}</CText>
        </Pane>
      )}
      {!inProcess && suggestion && (
        <Pane display="flex" alignItems="center" columnGap="10px">
          <TextInput
            size="small"
            color="white"
            appearance="primary"
            height="100%"
            flex={1}
            borderRadius="5px"
            placeholder="Id, text, regular expression"
            value={suggestion}
            onChange={(ev) => setSuggestion(ev.target.value)}
          />
          <Icon icon={MdClose} b_hover cursor="pointer" onClick={() => setSuggestion('')} />
          <Icon icon={FaCheck} b_hover cursor="pointer" onClick={onAcceptSuggestion} />
        </Pane>
      )}
    </Pane>
  )
}
