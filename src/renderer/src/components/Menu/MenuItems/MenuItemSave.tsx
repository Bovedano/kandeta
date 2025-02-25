import { MenuItem, SubMenu } from '@renderer/components/Commons/Menu/MenuItem/MenuItem'
import { useProjectContext } from '@renderer/context/useVInspectorSelectionContext'
import { saveProject } from '@renderer/core/project/projectSave'
import { useMemo } from 'react'
import { IoSaveOutline } from 'react-icons/io5'

export const MenuItemSave = (): JSX.Element => {
  const { project, setProject } = useProjectContext()

  const submenus: SubMenu[][] = useMemo(() => {
    const smbns: SubMenu[][] = [
      [
        {
          label: 'Save',
          onClick: (): void => {
            saveProject(project, false).then((project) => setProject(project))
          }
        },
        {
          label: 'Save as',
          onClick: (): void => {
            saveProject(project, true).then((project) => setProject(project))
          }
        }
      ],
      [
        {
          label: 'Export to format',
          onClick: (): void => {
            alert('Not implemented yet')
          }
        }
      ]
    ]
    return smbns
  }, [project])

  return (
    <MenuItem id="save" icon={IoSaveOutline} submenus={submenus} onClick={submenus[0][0].onClick} />
  )
}
