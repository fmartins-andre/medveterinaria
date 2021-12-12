import {
  FirebaseOptions,
  initializeApp
} from 'firebase/app'
import {
  collection as getCollection,
  doc,
  getDocs,
  getFirestore,
  query,
  where
} from 'firebase/firestore'

import type { Data } from '../types/DatabaseData'

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const listAll = async (collection: string): Promise<Data[]|undefined> => {
  try {
    const data:Data[] = []

    const querySnapshot = await getDocs(getCollection(db, collection))
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data()
      })
    })

    return data
  } catch (error) {
    return undefined
  }
}

const findByReferences = async (
  collection: string,
  refCollection: string,
  docs: string[]
): Promise<Data[]|undefined> => {
  try {
    const data:Data[] = []
    const refs = docs.map(_doc => {
      return doc(db, 'sintomas/djUAKaKxDiYV1nKGl0jk') // `${refCollection}/${_doc}`)
    })

    console.log('refs: ', refs[0])

    const _query = query(
      getCollection(db, collection),
      where(refCollection, '==', refs[0])
    )

    console.log('query: ', _query)

    const querySnapshot = await getDocs(_query)
    querySnapshot.forEach((doc) => {
      console.log('qs: ', doc)
      data.push({
        id: doc.id,
        ...doc.data()
      })
    })

    return data
  } catch (error) {
    console.log('error: ', error)
    return undefined
  }
}

export const firebaseDb = {
  listAll,
  findByReferences
}
