import { render, act } from '@testing-library/react';
import Home from '../../screens/Home';
import MainContext from '@/pages/_shared/MainContext';

describe('Home', () => {
  it('renders without exploding', async () => {
    let container: HTMLElement = document.createElement('div');
    await act(async () => {
      const component = render(
        <MainContext>
          <Home />
        </MainContext>
      );
      container = component.container;
    });
    expect(container.ownerDocument.title).toEqual('My Links - Home');
    expect(container.firstChild).toMatchSnapshot();
  });
});
