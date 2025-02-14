import { MenuItem } from '@renderer/components/Commons/Menu/MenuItem/MenuItem'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { saveProject } from '@renderer/core/project/projectPersistence'
import { IoSaveOutline } from 'react-icons/io5'

export const MenuItemSave = (): JSX.Element => {
  const { project, setProject } = useProjectContext()

  const onClickHandler = (): void => {
    saveProject(project).then((project) => setProject(project))
  }

  return <MenuItem icon={IoSaveOutline} onClick={onClickHandler} />
}
