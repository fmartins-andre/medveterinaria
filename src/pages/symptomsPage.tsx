
import { Grid } from '@mui/material'
import { gql } from 'graphql-request'
import {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState
} from 'react'

import Autocomplete from '../components/Autocomplete'
import DiseaseCard from '../components/DiseaseCard'
import { requestGQL, useGQL } from '../infra/useGQL'
import { Disease, Symptoms } from '../types/DatabaseData'

const symptomsQuery = gql`
  {
    symptoms {
      name
    }
  }
`

const diseasesQuery = gql`
  query ($symptoms: [String]) {
    diseases (query: { symptoms_in: $symptoms}) {
      name
      symptoms
    }
  }
`

const SymptomsPage:FC = () => {
  const [diseases, setDiseases] = useState<Disease[]>([])
  const [symptoms, setSymptoms] = useState<Symptoms[]>([])
  const [selected, setSelected] = useState<string[]>([])

  const { data: gotSymptoms }: {data: any} = useGQL(symptomsQuery)

  const getDiseases = useCallback(async (symptoms: string[]) => {
    const data = await requestGQL(diseasesQuery, { symptoms })
    if (data) setDiseases(data.diseases)
  }, [])

  useEffect(() => {
    if (gotSymptoms) setSymptoms(gotSymptoms.symptoms)
  }, [gotSymptoms])

  useEffect(() => {
    if (selected) getDiseases(selected)
  }, [selected])

  useEffect(() => {
    console.log('diseases: ', diseases)
    console.log('typeof diseases: ', typeof diseases)
  }, [diseases])

  const handleChange = (event: SyntheticEvent<Element, Event>, value: string[]) => {
    event.preventDefault()
    setSelected(value)
  }

  return (
    <Grid container flexDirection="column" gap={4}>

      <Grid item>
        <Autocomplete
          label="Sintomas"
          placeholder="Sintomas"
          options={symptoms.map(symptom => symptom.name)}
          onChange={handleChange}
        />
      </Grid>

      <Grid item container>
        {diseases?.map(d => <DiseaseCard key={d.name} disease={d} />) ?? <></>}

      </Grid>

    </Grid>
  )
}

export default SymptomsPage
