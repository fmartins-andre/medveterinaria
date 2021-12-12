import { Box, SxProps, Theme } from '@mui/material'
import { FC } from 'react'

const Layout: FC = ({ children }) => {
  return (
    <Box sx={containerStyles}>
      {children}
    </Box>
  )
}

const containerStyles: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '100px 1fr'
}

export default Layout
