import { FunctionComponent } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { routes } from '../../config/routes';
import ScreenContainer from '../ScreenContainer';
import HomeScreen from '../../screens/Home';
import NotFoundScreen from '../../screens/NotFound';
import LinkNotFound from '../../screens/LinkNotFound';
import UpdateLink from '../../screens/UpdateLink';
import AddLink from '../../screens/AddLink';
import DomainManager from '../../screens/DomainManager';

const RoutesContainer: FunctionComponent = () => {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route path={routes.HOME.path} element={<ScreenContainer />}>
        <Route index element={<HomeScreen />} />
        <Route path={routes.LINK_NOT_FOUND.path} element={<LinkNotFound />} />
        <Route path={routes.UPDATE_LINK.path} element={<UpdateLink />} />
        <Route path={routes.ADD_LINK.path} element={<AddLink />} />
        <Route path={routes.DOMAIN_MANAGER.path} element={<DomainManager />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Route>
    </Routes>
  );
};

export default RoutesContainer;
