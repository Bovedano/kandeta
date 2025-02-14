import { selectFile, selectNewFile } from '@renderer/controllers/nativeController'
import { FilesFormats, LanguageDefinition } from '@renderer/core/domain'
import { getLoader } from '@renderer/core/files/loaderFactory'
import { Button, Pane, Radio, TextInput } from 'evergreen-ui'

const idWidth = 60
const buttonWidth = 20
const nbuttons = 2

interface LanguageListItemProps {
  files_format: FilesFormats
  language: LanguageDefinition
  value: string
  isDefault: boolean
  onChange: (language: LanguageDefinition, value: string, isDefault: boolean) => void
}

export const LanguageListItem = (props: LanguageListItemProps): JSX.Element => {
  return (
    <Pane
      display="flex"
      width="100%"
      flexDirection="row"
      paddingX="5px"
      justifyContent="space-between"
      alignItems="center"
    >
      <Radio
        width={idWidth + 'px'}
        checked={props.isDefault}
        name="group"
        label={props.language.id}
        onChange={() => {
          props.onChange(props.language, props.value, true)
        }}
      />
      <TextInput
        width={'calc(100% - ' + (idWidth + buttonWidth * nbuttons + 20) + 'px)'}
        name="text-input-name"
        placeholder="Language File"
        border="none"
        boxShadow="none"
        size="small"
        value={props.value}
        onChange={(ev) => {
          props.onChange(props.language, ev.target.value, props.isDefault)
        }}
      />
      <Button
        width={buttonWidth + 'px'}
        boxShadow="none"
        size="small"
        onClick={() => {
          selectFile().then((filename) => props.onChange(props.language, filename, props.isDefault))
        }}
      >
        ...
      </Button>
      <Button
        width={buttonWidth + 'px'}
        boxShadow="none"
        size="small"
        onClick={() => {
          selectNewFile(
            props.language.id + '.copy.' + getLoader(props.files_format).generator().extension,
            getLoader(props.files_format).generator().content
          ).then((filename) => {
            if (filename) {
              props.onChange(props.language, filename, props.isDefault)
            }
          })
        }}
      >
        +
      </Button>
    </Pane>
  )
}
