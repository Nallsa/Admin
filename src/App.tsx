import { Box } from '@mui/system';
import Routs from './routes/index';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useActions } from './hooks/useActions';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logOut } = useActions();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const currentTime = Date.now() / 1000;
      const decodedOldToken: any = jwtDecode(token);
      if (decodedOldToken?.exp < currentTime) {
        localStorage.removeItem('token');
        navigate('/');
      }
    } else {
      logOut();
      navigate('/');
    }
  }, []);

  return (
    <>
      <Box sx={{ width: '100vw', height: '100vh', display: 'flex' }}>
        <Routs />
      </Box>
    </>
  );
};

export default App;
