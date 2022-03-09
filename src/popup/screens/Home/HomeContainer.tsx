import { FunctionComponent } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const HomeContainer: FunctionComponent = () => {
  useDocumentTitle('My Links - Home');
  return <div>My Links Home</div>;
};

export default HomeContainer;
