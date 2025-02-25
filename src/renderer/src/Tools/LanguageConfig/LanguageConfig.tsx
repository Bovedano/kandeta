import { LanguageList } from '@renderer/Tools/LanguageConfig/LanguageList/LanguageList'
import { useToolLanguageConfig } from '@renderer/Tools/hooks/useToolLanguageConfig'
import { getLanguageById } from '@renderer/config/languages'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { LanguageDefinition, LanguageFile } from '@renderer/core/domain'
import { loadLanguageFilesToProject } from '@renderer/core/project/loadFilesToProject'
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
  isDefault: boolean
}

const initList = (lfiles: LanguageFile[]): FormStateElement[] => {
  const list: FormStateElement[] = []

  for (let i = 0; i < lfiles.length; i++) {
    const language: LanguageDefinition | undefined = getLanguageById(lfiles[i].language_id)
    if (language) {
      list.push({
        isDefault: lfiles[i].is_default,
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

  const [value, setValue] = useState<FormStateElement[]>(initList(project.files))

  useEffect(() => {
    setValue(initList(project.files))
  }, [project, project.files])

  console.log(value)

  const onConfirmValue = (): void => {
    const lfiles: LanguageFile[] = value.map((value) => ({
      language_file: value.value,
      language_id: value.language.id,
      is_default: value.isDefault
    }))

    const validLfiles: LanguageFile[] = lfiles.filter((lfile) => !!lfile.language_file)

    console.log('validLfiles', validLfiles)

    loadLanguageFilesToProject(validLfiles, project)
      .then((project) => {
        setProject(project)
      })
      .catch((faileds) => console.log('NOK: ' + JSON.stringify(faileds)))

    languageConfigController.close()
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
      <LanguageList value={value} onChange={setValue} files_format={project.files_format} />
    </Dialog>
  )
}
