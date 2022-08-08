import { FC } from 'react';
import styles from './styles.module.css';

export interface IProps {
    variant: 'rect' | 'circle';
    width?: number;
    height?: number;
    style?: React.CSSProperties;
}

const Skeleton: FC<IProps> = ({ variant, width = 150, height = 25, style }) => (
    <div
        className={styles.skeleton}
        style={{
            borderRadius: variant === 'circle' ? '50%' : 0,
            width: width,
            height: variant === 'circle' ? width : height,
            ...style,
        }}
    />
);

export default Skeleton;
