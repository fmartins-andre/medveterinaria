export type Data = {
  [key: string]: any
}

export type Symptoms = {
  id?: string
  name: string
}

export type Disease = {
  id?: string
  name: string
  symptoms: string[]
}
