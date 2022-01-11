import { CardContent, Paper, Typography as T } from '@mui/material'
import { FC } from 'react'

import type { Disease } from '../../types/DatabaseData'

export type DiseaseCardProps = {
  disease: Disease
}

const DiseaseCard: FC<DiseaseCardProps> = ({ disease }) => {
  return (
    <Paper elevation={4} sx={{ margin: 1, maxWidth: 360 }}>
      <CardContent color="primary">
      <T sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Doença
      </T>
      <T variant="h5" component="div">
        {disease.name}
      </T>
      <T sx={{ mb: 1.5 }} color="text.secondary">

      </T>
      <T variant="body2" color="text.secondary">
        {disease.symptoms.join(', ')}
      </T>
    </CardContent>
  </Paper>
  )
}

export default DiseaseCard
