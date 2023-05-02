import { FunctionComponent } from 'react';
import { render } from '@testing-library/react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const TestDocumentTitleComponent: FunctionComponent<{ title: string }> = ({ title }) => {
  useDocumentTitle(title);
  return null;
};

describe('useDocumentTitle', () => {
  it('renders without exploding', () => {
    const mockTitle = 'test title';
    const root = render(<TestDocumentTitleComponent title={mockTitle} />);
    expect(root.container.ownerDocument.title).toMatchInlineSnapshot(`"My Links - test title"`);
  });
});
