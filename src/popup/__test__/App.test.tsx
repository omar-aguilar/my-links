import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { routes } from '../config/routes';
import App from '../App';

describe('App', () => {
  it('renders home page', () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders link not found page', () => {
    const { container } = render(
      <MemoryRouter initialEntries={[routes.LINK_NOT_FOUND.path]}>
        <App />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders not found page', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/a-link-to-nowhere']}>
        <App />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
