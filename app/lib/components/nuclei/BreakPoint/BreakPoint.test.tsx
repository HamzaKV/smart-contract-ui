import { render, screen } from '@testing-library/react';
import Component from './BreakPoint';

describe('BreakPoint', () => {
    it('should render breakpoint correctly', () => {
        render(
            <Component type='lg'>
                <div data-testid='breakpoint'>Text</div>
            </Component>
        );
        expect(screen.getByTestId('breakpoint')).toBeInTheDocument();
    });

    it('should not render anything', () => {
        render(
            <Component type='sm'>
                <div data-testid='breakpoint'>Text</div>
            </Component>
        );
        expect(screen.queryByTestId('breakpoint')).not.toBeInTheDocument();
    });
});
