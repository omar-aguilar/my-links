import { render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LinkNotFound from '../../screens/LinkNotFound';
import { routes } from '../../config/routes';
import Link from '../../../background/LinkManager/Link';

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

  it('renders similarities', () => {
    const sendMessageMock = jest.fn();
    Object.defineProperty(globalThis, 'chrome', {
      value: {
        runtime: {
          sendMessage: sendMessageMock,
        },
      },
    });

    const mockLink = 'w/link';
    const mockSimilarities: Similarity[] = [
      {
        link: new Link(mockLink),
        description: 'test suggestion',
      },
    ];
    const expectedMessage = {
      action: 'similarities',
      data: { rawLink: mockLink },
    };
    const path = `${routes.LINK_NOT_FOUND.path}?link=${mockLink}`;
    const { container } = render(
      <MemoryRouter initialEntries={[path]}>
        <LinkNotFound />
      </MemoryRouter>
    );
    expect(container.ownerDocument.title).toEqual('My Links - Link Not Found');
    expect(sendMessageMock).toHaveBeenCalled();
    const [message, callback] = sendMessageMock.mock.calls[0];
    expect(message).toEqual(expectedMessage);
    return act(async () => {
      callback(mockSimilarities);
    }).then(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
