import { FC } from 'react';
import { Container } from '../../nuclei/Container';

export interface IProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const Section: FC<IProps> = ({ children, style }) => (
    <Container
        style={Object.assign(
            {},
            {
                width: '80%',
                maxWidth: 1000,
                overflowWrap: 'break-word',
            },
            style
        )}
    >
        {children}
    </Container>
);

export default Section;
