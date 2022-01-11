import { GraphQLClient } from 'graphql-request'
import useSWR from 'swr'

import { endpoint, getValidAccessToken } from './realmApp'

const client = new GraphQLClient(endpoint)

type UseGQL = {
  data: object | void | undefined
  loading: boolean
  error: any
}

async function requestGQL (query:any, variables?:any) {
  const accessToken = await getValidAccessToken()
  client.setHeader('Authorization', `Bearer ${accessToken}`)
  return await client.request(query, variables)
}

function useGQL (query:any, variables?:any):UseGQL {
  const { data, error } = useSWR(query, async (fetch: any) => {
    const accessToken = await getValidAccessToken()
    client.setHeader('Authorization', `Bearer ${accessToken}`)
    return await client.request(fetch, variables)
  })

  type Response = {
    data: any
    loading: boolean
    error: any
  }

  const response:Response = {
    data,
    loading: !error && !data,
    error
  }

  return response
}

export default useGQL
export { requestGQL, useGQL }
