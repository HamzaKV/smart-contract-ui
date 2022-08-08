import { FC } from 'react';
import styles from './styles.module.css';

const Separator: FC = ({ children }) => (
    <div className={styles.seperator}>{children}</div>
);

export default Separator;
