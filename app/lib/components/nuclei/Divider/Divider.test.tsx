import { render } from '@testing-library/react';
import Component from './Divider';

describe('Divider', () => {
    const thickness = 2;
    const color = '#000000';

    it('should have correct color', () => {
        const { container } = render(
            <Component thickness={thickness} color={color} />
        );

        expect(container.firstChild).toHaveStyle(`background-color: ${color}`);
    });

    it('should be a horizontal divider', () => {
        const { container } = render(
            <Component thickness={thickness} color={color} />
        );

        expect(container.firstChild).toHaveStyle(`width: ${thickness}px`);
    });

    it('should be a vertical divider', () => {
        const { container } = render(
            <Component
                orientation='vertical'
                thickness={thickness}
                color={color}
            />
        );

        expect(container.firstChild).toHaveStyle(`height: ${thickness}px`);
    });
});
