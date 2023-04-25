import { FunctionComponent } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Home: FunctionComponent = () => {
  useDocumentTitle('My Links - Home');
  return (
    <>
      <div>My Links Home</div>;
    </>
  );
};

export default Home;
