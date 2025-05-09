import { Outlet } from 'react-router-dom';
import SessionRedirector from '../components/SessionRedirector.jsx';

const Layout = () => {
  return (
    <>
      <SessionRedirector />
      <Outlet />
    </>
  );
};

export default Layout;
