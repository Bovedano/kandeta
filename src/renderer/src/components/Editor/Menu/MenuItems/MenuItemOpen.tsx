import { MenuItem } from '@renderer/components/Editor/Menu/MenuItem/MenuItem'
import { readFile, selectFile } from '@renderer/controllers/nativeController'
import { toaster } from 'evergreen-ui'
import { IoFolderOpenOutline } from 'react-icons/io5'

export const MenuItemOpen = (): JSX.Element => {
  const onClickHandler = (): void => {
    selectFile().then((opf) => {
      if (opf) {
        readFile(opf)
          .then((fileContent) => console.log(fileContent))
          .catch(() => toaster.danger('Error opening file'))
      }
    })
  }

  return <MenuItem icon={IoFolderOpenOutline} onClick={onClickHandler} />
}
