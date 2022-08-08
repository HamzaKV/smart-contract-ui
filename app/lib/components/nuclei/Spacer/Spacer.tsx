import { FC } from 'react';

export interface IProps {
    width: string | number;
    height: string | number;
    style?: React.CSSProperties;
}

const Spacer: FC<IProps> = ({ width, height, style }) => {
    return <div style={{ width, height, ...style }} />;
};

export default Spacer;
