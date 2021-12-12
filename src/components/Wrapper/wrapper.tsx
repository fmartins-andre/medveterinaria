import { Container } from '@mui/material'
import { FC } from 'react'

const Wrapper: FC = ({ children }) => {
  return (
    <Container maxWidth={false}>
      {children}
    </Container>
  )
}

export default Wrapper
