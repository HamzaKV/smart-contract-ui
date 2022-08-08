import { FC } from 'react';
import { Container } from '../../nuclei/Container';

export interface IProps {
    children: React.ReactNode;
    maxHeight?: React.CSSProperties['maxHeight'];
}

const ScrollDiv: FC<IProps> = ({ children, maxHeight }) => (
    <Container
        style={{
            maxHeight: maxHeight,
            overflowY: 'auto',
            overflowX: 'hidden',
        }}
    >
        {children}
    </Container>
);

export default ScrollDiv;
