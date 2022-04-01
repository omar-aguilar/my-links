import { render } from '@testing-library/react';
import Home from '../../screens/Home';

describe('Home', () => {
  it('renders without exploding', () => {
    const { container } = render(<Home />);
    expect(container.ownerDocument.title).toEqual('My Links - Home');
    expect(container.firstChild).toMatchSnapshot();
  });
});
