import { FC } from 'react';
import { ActionView } from '../../atoms/ActionView';

const sizes = {
    xl: {
        width: 250,
        height: 70,
    },
    lg: {
        width: 200,
        height: 50,
    },
    md: {
        width: 150,
        height: 40,
    },
    sm: {
        width: 100,
        height: 30,
    },
    xs: {
        width: 50,
        height: 20,
    },
};

export interface IProps {
    children: React.ReactNode;
    onClick: (event?: React.MouseEvent<HTMLElement>) => void;
    size: keyof typeof sizes;
    backgroundColor?: string;
    fontColor?: string;
    style?: React.CSSProperties;
}

const Button: FC<IProps> = ({
    children,
    onClick,
    size,
    backgroundColor,
    fontColor,
    style,
}) => (
    <ActionView
        onClick={onClick}
        style={{
            width: sizes[size]?.width ?? 'auto',
            height: sizes[size]?.height ?? 'auto',
            ...style,
        }}
        backgroundColor={backgroundColor}
        fontColor={fontColor}
    >
        {children}
    </ActionView>
);

export default Button;
