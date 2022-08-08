import { fireEvent, getByText, render } from '@testing-library/react';
import Component from './ActionView';

describe('ActionView', () => {
    let result = 'One';

    it('renders correctly', () => {
        const { container } = render(
            <Component onClick={() => (result = 'Two')}>Submit</Component>
        );
        fireEvent.click(getByText(container, 'Submit'));
        expect(result).toBe('Two');
    });
});
