import { AppBar, Toolbar, Typography } from '@mui/material'
import { CSSProperties, FC } from 'react'

const Header: FC = () => {
  return (
    <header style={wrapper}>
      <AppBar>
        <Toolbar>
          <Typography>Med Vet</Typography>
        </Toolbar>
      </AppBar>
    </header>
  )
}

const wrapper:CSSProperties = {
  position: 'relative',
  width: '100%'
}

export default Header
