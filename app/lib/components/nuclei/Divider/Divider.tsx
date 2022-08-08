import { FC } from 'react';

export interface IProps {
    thickness: number | string;
    color: string;
    radius?: number;
    orientation?: 'vertical' | 'horizontal';
    style?: React.CSSProperties;
}

const Divider: FC<IProps> = ({
    thickness,
    color,
    radius,
    orientation = 'horizontal',
    style,
}) => (
    <div
        style={{
            width: orientation === 'horizontal' ? thickness : 2,
            height: orientation === 'horizontal' ? 2 : thickness,
            backgroundColor: color,
            borderRadius: radius,
            ...style,
        }}
    />
);

export default Divider;
