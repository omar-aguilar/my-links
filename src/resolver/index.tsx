import { createRoot } from 'react-dom/client';
import Resolver from './Resolver';
import '../shared/main.css';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(<Resolver />);
