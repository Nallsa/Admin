import { useState } from 'react'
import { useSelector } from 'react-redux'

// material-ui
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

// project imports
import NavItem from '../NavItem'

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'


import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { RootState } from '../../../../redux/store'

interface IProps {
  menu: any
  level: number
}

const NavCollapse: React.FC<IProps> = ({ menu, level }) => {
  const theme = useTheme()
  const { borderRadius, sidebarState } = useSelector(
    (state: RootState) => state.ui
  )

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const handleClick = () => {
    setOpen(!open)
    setSelected(!selected ? menu.id : null)
  }

  // menu collapse & item
  const menus = menu.children?.map((item: any) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} />
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />
      default:
        return (
          <Typography key={item.id} variant='h6' color='error' align='center'>
            Menu Items Error
          </Typography>
        )
    }
  })

  const Icon = menu.icon
  const menuIcon = menu.icon ? (
    <Icon
      strokeWidth={1.5}
      size='1.3rem'
      style={{ marginTop: 'auto', marginBottom: 'auto' }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected === menu.id ? 8 : 6,
        height: selected === menu.id ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  )

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: `${borderRadius}px`,
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          justifyContent: sidebarState ? 'initial' : 'center',
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`,
        }}
        selected={selected === menu.id}
        onClick={handleClick}
      >
        <ListItemIcon
          sx={{
            my: 'auto',
            minWidth: !menu.icon ? 18 : 36,
            mr: sidebarState ? 3 : 'auto',
            justifyContent: 'center',
            color: selected === menu.id ? '#76A741' : 'inherit',
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText
          sx={{ opacity: sidebarState ? 1 : 0 }}
          primary={
            <Typography
              variant={selected === menu.id ? 'body1' : 'body2'}
              color={selected === menu.id ? '#76A741' : 'inherit'}
              sx={{ my: 'auto' }}
            >
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography
                variant='caption'
                /* sx={{ ...theme.typography.subMenuCaption }} */ display='block'
                gutterBottom
              >
                {menu.caption}
              </Typography>
            )
          }
        />
        {sidebarState && (
          <>
            {open ? (
              <ExpandLessIcon
                /* size="1rem" */ style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}
              />
            ) : (
              <ExpandMoreIcon
                /* size="1rem" */ style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}
              />
            )}
          </>
        )}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List
          component='div'
          disablePadding
          sx={{
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 1,
              background: theme.palette.primary.light,
            },
          }}
        >
          {menus}
        </List>
      </Collapse>
    </>
  )
}

export default NavCollapse
