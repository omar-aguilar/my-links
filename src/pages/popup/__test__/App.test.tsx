import { render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { routes } from '@/pages/popup/config/routes';
import App from '@/pages/popup/App';

describe('App', () => {
  it('renders home page', async () => {
    let container: HTMLElement = document.createElement('div');
    await act(async () => {
      const component = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
      container = component.container;
    });

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
