import { styled, useTheme } from '@mui/material/styles';
import Header from './Header';
import Sidebar from './Sidebar';
import { Main, RootStyle, ScrollWrapper } from '../Main';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  const theme = useTheme();

  return (
    <RootStyle>
      <CssBaseline>
        <Header />
        <Sidebar />
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          style={{
            top: '90px',
          }}
        />
        <Main theme={theme}>
          {/* Same as */}

          <ScrollWrapper theme={theme}>
            <Container
              style={{
                paddingLeft: '0px',
                marginTop: '30px',
              }}
            >
              <Outlet />
            </Container>
          </ScrollWrapper>
        </Main>
      </CssBaseline>
    </RootStyle>
  );
};

export default MainLayout;
