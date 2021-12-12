
import { Grid } from '@mui/material'
import {
  FC,
  SyntheticEvent,
  useEffect,
  useState
} from 'react'

import Autocomplete from '../components/Autocomplete'
import { DISEASE, SYMPTOMS } from '../config/constants'
import { db } from '../data/db'
import { Disease, Symptoms } from '../types/DatabaseData'

const SymptomsPage:FC = () => {
  const [symptoms, setSymptoms] = useState<Symptoms[]>([])
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    db.listAll(SYMPTOMS).then(data => {
      setSymptoms(data as Symptoms[])
    })
  }, [])

  useEffect(() => {
    const refs = symptoms
      .filter(symptom => selected.includes(symptom.nome))
      .map(symptom => symptom.id)

    db.findByReferences(DISEASE, SYMPTOMS, refs).then(data => {
      const _data = data as unknown as Disease
      console.log('doenças: ', _data)
    }).catch((error) => {
      console.log(error)
    })
  }, [selected])

  const handleChange = (event: SyntheticEvent<Element, Event>, value: string[]) => {
    event.preventDefault()
    setSelected(value)
  }

  return (
    <Grid container flexDirection="column" gap={4}>

      <Grid item>
        { symptoms.length > 0 &&
          <Autocomplete
          label="Sintomas"
          placeholder="Sintomas"
          options={symptoms.map(symptom => symptom.nome)}
          onChange={handleChange}
        />}
      </Grid>

      <Grid item>
        teste

      </Grid>

    </Grid>
  )
}

export default SymptomsPage
