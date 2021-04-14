
import React from 'react'
import { AppBar } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'


function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h2">Funny-Dev</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
