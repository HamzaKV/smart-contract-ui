import { FC } from 'react';

export interface IProps {
    children: React.ReactNode;
    backgroundColor: React.CSSProperties['backgroundColor'];
    shadow: React.CSSProperties['boxShadow'];
    style?: React.CSSProperties;
}

const Card: FC<IProps> = ({
    children,
    backgroundColor,
    shadow,
    style,
}) => (
    <div
        style={{
            backgroundColor: backgroundColor,
            borderRadius: 8,
            minHeight: 200,
            padding: 20,
            boxShadow: shadow,
            position: 'relative',
            ...style,
        }}
    >
        {children}
    </div>
);

export default Card;
