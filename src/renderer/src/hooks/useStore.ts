import { getAppDir, readFile, writeFile } from '@renderer/controllers/nativeController'
import path from 'path-browserify'

interface UserStoreValue<T> {
  set: (value: T) => Promise<void>
  get: () => Promise<T>
  update: (fnc: (value: T) => T) => Promise<void>
}

const getDir = async (file): Promise<string> => {
  const appDir = await getAppDir()
  const filepath = path.join(appDir + '/' + file)
  console.log('filepath', appDir)

  return filepath
}

export const useStore = <T>(file: string): UserStoreValue<T> => {
  const set = async (value: T): Promise<void> => {
    await writeFile(await getDir(file), JSON.stringify(value))
  }

  const get = async (): Promise<T> => {
    const str = await readFile(await getDir(file))
    const value: T = JSON.parse(str)
    return value
  }

  const update = async (fnc: (value: T) => T): Promise<void> => {
    const value = await get()
    const newValue = await fnc(value)
    await set(newValue)
  }

  return { set, get, update }
}
