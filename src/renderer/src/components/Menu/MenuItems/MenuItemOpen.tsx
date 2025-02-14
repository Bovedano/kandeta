import { MenuItem } from '@renderer/components/Commons/Menu/MenuItem/MenuItem'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { loadProject } from '@renderer/core/project/projectPersistence'
import { IoFolderOpenOutline } from 'react-icons/io5'

export const MenuItemOpen = (): JSX.Element => {
  const { setProject } = useProjectContext()

  const onClickHandler = (): void => {
    loadProject()
      .then((project) => {
        setProject(project)
      })
      .catch(() => {
        alert('Error')
      })
  }

  return <MenuItem icon={IoFolderOpenOutline} onClick={onClickHandler} />
}
