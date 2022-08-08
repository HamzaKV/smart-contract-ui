import { FC } from 'react';
import { Container } from '../../nuclei/Container';

export interface IProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const Page: FC<IProps> = ({ children, style }) => (
    <Container
        style={Object.assign(
            {},
            {
                width: '100%',
                maxWidth: 1200,
                minWidth: 250,
                marginRight: 'auto',
                marginLeft: 'auto',
                minHeight: '85vh',
            },
            style
        )}
    >
        {children}
    </Container>
);

export default Page;
