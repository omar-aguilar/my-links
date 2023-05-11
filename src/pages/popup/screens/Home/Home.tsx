import useDocumentTitle from '../../hooks/useDocumentTitle';
import Search from '../../components/Search';

const Home = () => {
  useDocumentTitle('Home');
  return (
    <div>
      <h1>My Links Home</h1>
      <Search />
    </div>
  );
};

export default Home;
