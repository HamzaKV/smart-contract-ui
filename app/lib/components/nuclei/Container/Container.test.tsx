import { render, screen } from '@testing-library/react';
import Component from './Container';

describe('Container', () => {

    it('should render', () => {
        render(<Component><div data-testid='container'>Text</div></Component>);
        expect(screen.getByTestId('container')).toBeInTheDocument();
    });
});
