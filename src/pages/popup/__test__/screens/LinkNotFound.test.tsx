import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LinkNotFound from '../../screens/LinkNotFound';

describe('LinkNotFound', () => {
  it('renders without exploding', () => {
    const { container } = render(
      <MemoryRouter>
        <LinkNotFound />
      </MemoryRouter>
    );
    expect(container.ownerDocument.title).toEqual('My Links - Link Not Found');
    expect(container.firstChild).toMatchSnapshot();
  });
});
