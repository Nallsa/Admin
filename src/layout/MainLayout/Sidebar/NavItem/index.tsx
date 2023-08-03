import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// material-ui
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { settings } from '../../../../ThemeStyle'
import { RootState } from '../../../../redux/store'
import { useActions } from '../../../../hooks/useActions'

interface IChip {
  color: string
  variant: string
  size: string | undefined
  label: string
  avatar: string
}

interface IMenuItem {
  id: string
  title: string
  type: string
  url: string
  icon: any
  breadcrumbs: boolean
  disabled?: boolean
  caption?: string
  children?: IMenuItem[]
  chip?: IChip
  external?: boolean
}

interface IProps {
  item: IMenuItem
  level: number
}

const NavItem: React.FC<IProps> = ({ item, level }) => {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'))
  const { activeMenuItem, sidebarState } = useSelector(
    (state: RootState) => state.ui
  )
  const { setActiveMenuItem, setSidebar } = useActions()

  const navigate = useNavigate()

  const Icon = item.icon

  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size='1.3rem' />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: activeMenuItem === item?.id ? 8 : 6,
        height: activeMenuItem === item?.id ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  )

  const itemHandler = (id: string, url: string) => {
    setActiveMenuItem(id)
    if (matchesSM) setSidebar(false)
    navigate(url)
  }

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex(id => id === item.id)
    if (currentIndex > -1) {
      setActiveMenuItem(item.id)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <ListItemButton
      disabled={item.disabled}
      sx={{
        borderRadius: `${settings.borderRadius}px`,
        justifyContent: sidebarState ? 'initial' : 'center',
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        /* pl: sidebarState ? `${level * 24}px` : '' */
      }}
      selected={activeMenuItem === item.id}
      onClick={() => itemHandler(item.id, item.url)}
    >
      <ListItemIcon
        sx={{
          my: 'auto',
          minWidth: !item?.icon ? 18 : 36,
          mr: sidebarState ? 3 : 'auto',
          justifyContent: 'center',
          color: activeMenuItem === item.id ? '#76A741' : 'inherit',
        }}
      >
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        sx={{ opacity: sidebarState ? 1 : 0 }}
        primary={
          <Typography
            variant={activeMenuItem === item.id ? 'body1' : 'body2'}
            color={activeMenuItem === item.id ? '#76A741' : 'inherit'}
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              variant='caption'
              /* sx={{ ...theme.typography.subMenuCaption }} */ display='block'
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
    </ListItemButton>
  )
}

export default NavItem
