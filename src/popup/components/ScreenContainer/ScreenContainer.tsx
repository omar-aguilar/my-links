import { Outlet } from 'react-router-dom';
import Menu from '../Menu/Menu';

const ScreenContainer = () => {
  return (
    <>
      <Menu />
      <section className="flex flex-col grow p-4">
        <Outlet />
      </section>
    </>
  );
};

export default ScreenContainer;
