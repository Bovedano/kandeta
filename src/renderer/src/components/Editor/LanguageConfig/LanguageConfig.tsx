import { LanguageList } from '@renderer/components/Editor/LanguageConfig/LanguageList/LanguageList'
import { LanguageDefinition, LanguageFile } from '@renderer/core/domain'
import { checkAndLoadFiles } from '@renderer/core/files/loader'
import { Dialog } from 'evergreen-ui'
import { useState } from 'react'

interface LanguageConfigProps {
  isOpen: boolean
  onClose: () => void
}

export interface FormStateElement {
  language: LanguageDefinition
  value: string
  isDefault: boolean
}

export const LanguageConfig = (props: LanguageConfigProps): JSX.Element => {
  const [value, setValue] = useState<FormStateElement[]>([])

  const onConfirmValue = (): void => {
    const lfiles: LanguageFile[] = value.map((value) => ({
      language_file: value.value,
      language_id: value.language.id,
      is_default: value.isDefault
    }))

    checkAndLoadFiles(lfiles)
      .then((loadeds) => console.log('OK: ' + JSON.stringify(loadeds)))
      .catch((faileds) => console.log('NOK: ' + JSON.stringify(faileds)))
  }

  return (
    <Dialog
      header="Language configuration"
      isShown={props.isOpen}
      onCloseComplete={props.onClose}
      onCancel={props.onClose}
      confirmLabel="Save"
      onConfirm={onConfirmValue}
    >
      <LanguageList value={value} onChange={setValue} />
    </Dialog>
  )
}
