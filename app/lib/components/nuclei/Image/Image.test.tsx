import { render } from '@testing-library/react';
import Component from './Image';

beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.IntersectionObserver = class IntersectionObserver {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        constructor() {}

        disconnect() {
            return null;
        }

        observe() {
            return null;
        }

        takeRecords() {
            return null;
        }

        unobserve() {
            return null;
        }
    };
});

describe('Image', () => {
    const image = 'https://picsum.photos/id/237/200/300';
    // eslint-disable-next-line max-len
    const placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

    it('should render correctly', () => {
        const { container } = render(<Component src={image} />);

        expect(container.firstChild).toHaveAttribute('src', placeholder);
    });
});
