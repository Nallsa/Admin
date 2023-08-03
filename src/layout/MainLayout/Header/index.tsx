
import { useSelector } from 'react-redux'

import Typography from '@mui/material/Typography'

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'

import Box from '@mui/material/Box'
import ProfileSection from './ProfileSection/ProfileSection'

import { NotificationWrapper } from '../../styles/Header.elements'
import { colors, settings } from '../../../ThemeStyle'
import { RootState } from '../../../redux/store'


interface AppBarProps extends MuiAppBarProps {
  open: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  marginLeft: settings.sidebarClose,
  width: `calc(100% - ${settings.sidebarPanelClose}px)`,
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: 'none',
  border: 'none',
  /* height: 50, */
  /* boxShadow: '0px -5px 5px -4px rgba(34, 60, 80, 0.3) inset', */
  /* borderBottom: '1px solid rgba(0, 0, 0, 0.12)', */
  color: theme.palette.text.primary,
  /* backdropFilter: 'blur(6px)', */
  /* WebkitBackdropFilter: 'blur(6px)', */ // Fix on Mobile
  backgroundColor: colors.white,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: settings.sidebarWidth,
    width: `calc(100% - ${settings.sidebarWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Header = () => {
  const { sidebarState } = useSelector((state: RootState) => state.ui)
  return (
    <AppBar position='fixed' open={sidebarState}>
      <Toolbar>
        <Typography variant='h6' noWrap component='div'>
          Панель управления
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <NotificationWrapper>
          {/* <NotificationSection /> */}
          <ProfileSection />
        </NotificationWrapper>
        {/* <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
				</Box> */}
      </Toolbar>
    </AppBar>
  )
}

export default Header
