import { screen, render } from '@testing-library/react';
import ConditionComposer from './ConditionComposer';

describe('ConditionComposer', () => {
    const FirstComponent = () => <div>First Component</div>;
    const SecondComponent = () => <div>Second Component</div>;
    const Component = ConditionComposer(FirstComponent, SecondComponent);

    it('should render First Component', () => {
        render(<Component condition={true} />);
        expect(screen.getByText('First Component')).toBeInTheDocument();
    });

    it('should render Second Component', () => {
        render(<Component condition={false} />);
        expect(screen.getByText('Second Component')).toBeInTheDocument();
    });
});
