import * as Realm from 'realm-web'

const API_KEY = process.env.REACT_APP_REALM_API_KEY ?? ''
const APP_ID = process.env.REACT_APP_REALM_APP_ID ?? ''
const endpoint = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`

const app = new Realm.App(APP_ID)

async function apiAuth (): Promise<Realm.User> {
  const credentials = Realm.Credentials.apiKey(API_KEY)
  const user:Realm.User = await app.logIn(credentials)
  return user
}

async function getValidAccessToken () {
  const user = await apiAuth()

  if (app.currentUser?.id !== user.id) {
    await app.logIn(Realm.Credentials.anonymous())
  } else {
    await app.currentUser.refreshCustomData()
  }
  return app.currentUser?.accessToken
}

export { endpoint, getValidAccessToken }
