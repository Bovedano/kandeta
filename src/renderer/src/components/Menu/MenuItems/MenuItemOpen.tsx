import { MenuItem, SubMenu } from '@renderer/components/Commons/Menu/MenuItem/MenuItem'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { getEmptyProject } from '@renderer/core/project/projectInitializer'
import { loadProjectFromFile, reLoadProject } from '@renderer/core/project/projectLoad'
import { useMemo } from 'react'
import { IoFolderOpenOutline } from 'react-icons/io5'

export const MenuItemOpen = (): JSX.Element => {
  const { project, setProject } = useProjectContext()

  const submenus: SubMenu[][] = useMemo(() => {
    const smbns: SubMenu[][] = [
      [
        {
          label: 'Open project from file',
          onClick: (): void => {
            loadProjectFromFile()
              .then((project) => {
                setProject(project)
              })
              .catch(() => {
                //TODO show alert
                alert('Error')
              })
          }
        },
        {
          label: 'Reload project',
          onClick: (): void => {
            reLoadProject(project)
              .then((project) => {
                setProject(project)
              })
              .catch(() => {
                //TODO show alert
                alert('Error')
              })
          },
          isDisabled: !project.file
        },
        {
          label: 'Close project',
          onClick: (): void => {
            setProject(getEmptyProject())
          },
          isDisabled: false
        }
      ],
      [
        {
          label: 'Exit',
          onClick: (): void => {}
        }
      ]
    ]
    return smbns
  }, [project, project.translation_info])

  return (
    <>
      <MenuItem
        id="open"
        onClick={submenus[0][0].onClick}
        icon={IoFolderOpenOutline}
        submenus={submenus}
      />
    </>
  )
}
