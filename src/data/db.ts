import store from 'store2'

import { firebaseDb } from '../infra/firebase'
import type { Data } from '../types/DatabaseData'

const listAll = async (collection:string):Promise<Data[]> => {
  const data = await localCache().get(
    collection,
    firebaseDb.listAll
  )

  return data
}

const findByReferences = async (
  collection:string,
  refCollection: string,
  docs: string[]
):Promise<Data[]|undefined> => {
  console.log('findByReference "docs": ', docs)
  if (docs.length > 0) {
    const data = await firebaseDb.findByReferences(collection, refCollection, docs)

    console.log(`findByReference "${collection}": `, data)

    return data
  }
}

export const db = {
  listAll,
  findByReferences
}

const localCache = () => {
  const getStorageRef = (collection: string) => `${collection}:medVet@storage`

  const set = (collection: string, data: any) =>
    store.set(getStorageRef(collection), data)

  const get = async (collection: string, dbCallback: CallableFunction) => {
    const value = store.get(getStorageRef(collection))

    if (value) return value

    const data = await dbCallback(collection)
    set(collection, data)

    console.log(`localCache "${collection}": `, value ?? data)
    return data
  }

  return { get, set }
}
