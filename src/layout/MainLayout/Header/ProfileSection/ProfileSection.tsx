import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Avatar,
  Box,
  Card,
  CardContent,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Paper,
  Popover,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import {
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineUser,
} from 'react-icons/ai';

// third-party

import PerfectScrollbar from 'react-perfect-scrollbar';
import { RootState } from '../../../../redux/store';
import { useActions } from '../../../../hooks/useActions';

const ProfileSection: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // const userName = useSelector((state: RootState) => state?.authReducer?.userData?.admin.name)
  const dispatch = useDispatch();
  const { logOut } = useActions();

  const [sdm, setSdm] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');
  /* const [notification, setNotification] = useState<boolean>(false); */
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      logOut();
      navigate('/');
      localStorage.removeItem('token');
    }
    return;
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleListItemClick = (index: number, route: string = ''): void => {
    setSelectedIndex(index);
    handleClose();

    if (route && route !== '') {
      navigate(route);
    }
  };

  const handleToggle = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <IconButton
        size='small'
        edge='end'
        aria-label='account of current user'
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        color='inherit'
      >
        <Avatar
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          color='inherit'
        />
      </IconButton>

      <Popover
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <Card
              elevation={16}
              /* boxShadow */
              /* shadow={theme.shadows[16]} */
              sx={{
                border: 'none',
              }}
            >
              <Box sx={{ p: 2 }}>
                <Stack>
                  <Stack direction='row' spacing={0.5} alignItems='center'>
                    <Typography variant='h4'>Здравствуйте,</Typography>
                    <Typography
                      component='span'
                      variant='h4'
                      sx={{ fontWeight: 400 }}
                    >
                      {/* {userName} */}
                    </Typography>
                  </Stack>
                </Stack>

                <OutlinedInput
                  sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
                  id='input-search-profile'
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder='Поиск настроек'
                  startAdornment={
                    <InputAdornment position='start'>
                      <AiOutlineSearch />
                    </InputAdornment>
                  }
                  aria-describedby='search-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <Divider />
              </Box>
              <PerfectScrollbar
                style={{
                  height: '100%',
                  maxHeight: 'calc(100vh - 250px)',
                  overflowX: 'hidden',
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Card
                    sx={{
                      my: 2,
                      backgroundColor: '#f8f7fa',
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={3} direction='column'>
                        <Grid item>
                          <Grid
                            item
                            container
                            alignItems='center'
                            justifyContent='space-between'
                          >
                            <Grid item>
                              <Typography variant='subtitle1'>
                                Отключить уведомления
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Switch
                                color='primary'
                                checked={sdm}
                                onChange={e => setSdm(e.target.checked)}
                                name='sdm'
                                size='small'
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* <Divider /> */}
                  <Card>
                    <List
                      component='nav'
                      sx={{
                        width: '100%',
                        maxWidth: 350,
                        minWidth: 300,
                        borderRadius: '10px',
                        backgroundColor: '#f8f7fa',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '100%',
                        },
                        '& .MuiListItemButton-root': {
                          mt: 0.5,
                        },
                      }}
                    >
                      <ListItemButton
                        /* sx={{ borderRadius: `10px` }} */
                        selected={selectedIndex === 0}
                        onClick={event => handleListItemClick(0, '/settings/')}
                      >
                        <ListItemIcon>
                          <AiOutlineSetting />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant='body2'>Настройки</Typography>
                          }
                        />
                      </ListItemButton>

                      <ListItemButton
                        /* sx={{ borderRadius: `10px` }} */
                        selected={selectedIndex === 1}
                        onClick={event => handleListItemClick(1, '/profile/')}
                      >
                        <ListItemIcon>
                          <AiOutlineUser />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant='body2'>Профиль</Typography>
                          }
                        />
                      </ListItemButton>

                      <ListItemButton
                        /* sx={{ borderRadius: `10px` }} */
                        selected={selectedIndex === 2}
                        onClick={handleLogout}
                      >
                        <ListItemIcon>
                          <AiOutlineLogout />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant='body2'>Выход</Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  </Card>
                </Box>
              </PerfectScrollbar>
            </Card>
          </ClickAwayListener>
        </Paper>
      </Popover>
    </Box>
  );
};

export default ProfileSection;
