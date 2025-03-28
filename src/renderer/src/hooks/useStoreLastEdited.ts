import { useStore } from '@renderer/hooks/useStore'
import { useEffect, useState } from 'react'

interface UserStoreLastEditedValue {
  lastEdited: string[]
  addEdited: (edited: string) => void
}

const limit = 5

export const useStoreLastEdited = (): UserStoreLastEditedValue => {
  const store = useStore<string[]>('lastEdited.cfg')

  const [lastEdited, setLastEdited] = useState<string[]>([])

  useEffect(() => {
    store.get().then((storedEdited) => setLastEdited(storedEdited))
  }, [])

  useEffect(() => {
    if (lastEdited.length > 0) {
      store.set(lastEdited)
    }
  }, [lastEdited])

  const addEdited = (edited: string): void => {
    const deletedLastEdited = lastEdited.filter((le) => le !== edited).slice(0, limit - 1)
    const newLastEdited = [...deletedLastEdited, edited]
    setLastEdited(newLastEdited.reverse())
  }

  return { lastEdited, addEdited }
}
