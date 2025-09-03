import { LanguageList } from '@renderer/Tools/LanguageConfig/LanguageList/LanguageList'
import { useToolLanguageConfig } from '@renderer/Tools/hooks/useToolLanguageConfig'
import { getLanguageById } from '@renderer/config/languages'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { LanguageDefinition, LanguageFile } from '@renderer/core/domain'
import { loadLanguageFilesToProject } from '@renderer/core/project/loadFilesToProject'
import { useError } from '@renderer/core/context/ErrorContext'
import { Dialog } from 'evergreen-ui'
import { useEffect, useState } from 'react'

interface LanguageConfigProps {
  isOpen: boolean
  onClose: () => void
  filesErrors?: string[]
}

export interface FormStateElement {
  language: LanguageDefinition
  value: string
}

const initList = (lfiles: LanguageFile[]): FormStateElement[] => {
  const list: FormStateElement[] = []

  for (let i = 0; i < lfiles.length; i++) {
    const language: LanguageDefinition | undefined = getLanguageById(lfiles[i].language_id)
    if (language) {
      list.push({
        language: language,
        value: lfiles[i].language_file
      })
    }
  }

  return list
}

export const LanguageConfig = (props: LanguageConfigProps): JSX.Element => {
  const { project, setProject } = useProjectContext()
  const languageConfigController = useToolLanguageConfig()
  const { showSimpleError } = useError()

  const [value, setValue] = useState<FormStateElement[]>(initList(project.files))

  const [valueLanguageId, setValueLanguageId] = useState<string>(
    project.translation_info.default_language_id
  )

  useEffect(() => {
    setValue(initList(project.files))
    setValueLanguageId(project.translation_info.default_language_id)
  }, [project, project.files])

  console.log(value)

  const onConfirmValue = (): void => {
    const lfiles: LanguageFile[] = value.map((value) => ({
      language_file: value.value,
      language_id: value.language.id
    }))

    const validLfiles: LanguageFile[] = lfiles.filter((lfile) => !!lfile.language_file)

    if (validLfiles.find((validf) => validf.language_id === valueLanguageId)) {
      console.log('validLfiles', validLfiles)

      loadLanguageFilesToProject(valueLanguageId, validLfiles, project)
        .then((project) => {
          setProject(project)
        })
        .catch((faileds) => console.log('NOK: ' + JSON.stringify(faileds)))

      languageConfigController.close()
    } else {
      showSimpleError(
        'Invalid default language',
        'The selected default language must have a corresponding language file configured.'
      )
    }
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
      <LanguageList
        value={value}
        onChange={setValue}
        files_format={project.files_format}
        idSelected={valueLanguageId}
        onSelectedChange={setValueLanguageId}
      />
    </Dialog>
  )
}
