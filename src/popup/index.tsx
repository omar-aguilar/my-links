import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './main.css';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
