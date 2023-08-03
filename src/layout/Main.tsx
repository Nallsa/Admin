import { styled } from '@mui/material/styles';
import { colors, settings } from '../ThemeStyle';

export const Main = styled('main', {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme }: { theme: any }) => ({
  flexGrow: 1,
  height: `calc(99vh - ${theme.mixins.toolbar.minHeight}px)`,
  overflow: 'hidden',
  width: '100vw',
  paddingRight: '95px',
  marginTop: theme.mixins.toolbar.minHeight,
  backgroundColor: '#fff',

  background: colors.background,
  zIndex: 2,
  [theme.breakpoints.up('lg')]: {
    borderTopLeftRadius: settings.blockBorderRadius,
    marginTop: theme.mixins.toolbar.minHeight + 10,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    boxShadow: '3px 3px 10px -2px rgba(34, 60, 80, 0.2) inset',
    borderTopLeftRadius: settings.blockBorderRadius,
    pointerEvents: 'none',
  },
}));

export const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  /* overflow: 'hidden', */
  /* background: '#f0f2f5', */
});

export const ScrollWrapper = styled('main', {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme }: { theme: any }) => ({
  height: `100%`,
  overflowY: 'scroll',
  zIndex: 1,
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));
