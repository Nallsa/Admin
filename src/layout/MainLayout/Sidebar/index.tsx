import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MenuIcon from '@mui/icons-material/Menu'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'

import { CSSObject, styled, Theme } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useSelector } from 'react-redux'

import MenuList from './MenuList/index'



import './Navbar.css'
import { settings } from '../../../ThemeStyle'
import { RootState } from '../../../redux/store'
import { useActions } from '../../../hooks/useActions'

interface DrawerProps {
  theme?: Theme
  open?: boolean
  drawerwidth: number
}

const openedMixin = (theme: Theme, drawerwidth: number): CSSObject => ({
  width: drawerwidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowY: 'hidden',
  border: 'none',
  /* borderRight: '1px solid rgba(0, 0, 0, 0.12)', */
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowY: 'hidden',
  width: `calc(${settings.sidebarClose}px - 10px)`,
  border: 'none',
  [theme.breakpoints.up('sm')]: {
    width: settings.sidebarClose,
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})<DrawerProps>(({ theme, open, drawerwidth: drawerWidth }) => ({
  width: drawerWidth || 280,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme, drawerWidth),
    '& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  border: 'none',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  [theme.breakpoints.down('lg')]: {
    visibility: 'hidden',
  },
}))

const DrawerContent = styled('div')(({ theme }) => ({
  height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  /* boxShadow: '-6px 0px 6px -4px rgba(34, 60, 80, 0.3) inset' */
}))

const Sidebar = () => {
  const { sidebarState } = useSelector((state: RootState) => state.ui)
  const { setSidebar } = useActions()

  const handleDrawerClose = () => {
    setSidebar(!sidebarState)
  }
  return (
    <Drawer
      variant='permanent'
      open={sidebarState}
      drawerwidth={settings.sidebarWidth}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {sidebarState ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </DrawerHeader>
      {/* <Divider /> */}
      <DrawerContent>
        <PerfectScrollbar
          options={{ suppressScrollX: true }}
          className='scrollbar'
          component='div'
          style={{
            height: '100%',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '16px',
          }}
        >
          <MenuList />
        </PerfectScrollbar>
      </DrawerContent>
    </Drawer>
  )
}

export default Sidebar
