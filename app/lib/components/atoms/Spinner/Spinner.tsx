import { FC } from 'react';
import styles from './styles.module.css';

export interface IProps {
    backgroundColor?: string;
    color?: string;
    width?: number;
    thickness?: number;
}

const Spinner: FC<IProps> = ({
    backgroundColor = '#f3f3f3',
    color = '#3498db',
    width = 200,
    thickness = 8,
}) => (
    // <div
    //     className={styles.spinner}
    //     style={{
    //         border: thickness + 'px solid ' + backgroundColor,
    //         borderTop: thickness + 'px solid ' + color,
    //         width: width,
    //         height: width,
    //     }}
    // ></div>
    <div className={styles.ldsRing} style={{ width, height: width }}>
        <div style={{ width, height: width }}></div>
        <div style={{ width, height: width }}></div>
        <div style={{ width, height: width }}></div>
        <div style={{ width, height: width }}></div>
    </div>
);

export default Spinner;

/**
 * TO DO:
 * -add variants prop: 'buffer' | 'determinate' | 'indeterminate'
 * -add value, and bufferValue props
 */
