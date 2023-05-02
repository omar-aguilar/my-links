import { render, act } from '@testing-library/react';
import Home from '../../screens/Home';

describe('Home', () => {
  it('renders without exploding', async () => {
    let container: HTMLElement = document.createElement('div');
    await act(async () => {
      const component = render(<Home />);
      container = component.container;
    });
    expect(container.ownerDocument.title).toEqual('My Links - Home');
    expect(container.firstChild).toMatchSnapshot();
  });
});
