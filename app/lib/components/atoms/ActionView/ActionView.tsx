import { FC } from 'react';
import { Container } from '../../nuclei/Container';
import styles from './styles.module.css';

export interface IProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
    backgroundColor?: string;
    fontColor?: string;
}

const ActionView: FC<IProps> = ({
    children,
    style,
    onClick,
    backgroundColor,
    fontColor,
}) => (
    <Container
        style={Object.assign(
            {},
            {
                cursor: 'pointer',
                backgroundColor: backgroundColor,
                color: fontColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            style
        )}
        onClick={onClick}
        className={styles.actionView}
    >
        {children}
    </Container>
);

export default ActionView;
