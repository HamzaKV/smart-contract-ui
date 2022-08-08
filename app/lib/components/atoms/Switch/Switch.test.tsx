import { fireEvent, render } from '@testing-library/react';
import Component from './Switch';

describe('Switch', () => {
    let value = 'Off';

    it('should render', () => {
        const { container } = render(
            <Component width={300} onChange={() => (value = 'On')} />
        );

        fireEvent.click(container.firstElementChild as Element);

        expect(value).toBe('On');
    });
});
