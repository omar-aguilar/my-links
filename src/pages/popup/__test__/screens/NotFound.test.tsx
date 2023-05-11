import { render } from '@testing-library/react';
import NotFound from '../../screens/NotFound';

describe('NotFound', () => {
  it('renders without exploding', () => {
    const { container } = render(<NotFound />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
