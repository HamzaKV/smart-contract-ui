import { FC } from 'react';
import { ActionView } from '../../atoms/ActionView';

export interface IProps {
    children: React.ReactNode;
    onClick: () => void;
    backgroundColor: string;
    containerStyle?: React.CSSProperties;
    link: JSX.IntrinsicElements['a']['href'];
    style?: React.CSSProperties;
}

const Link: FC<IProps> = ({
    children,
    onClick,
    backgroundColor,
    containerStyle,
    link,
    style,
}) => (
    <ActionView
        backgroundColor={backgroundColor}
        style={{ width: 'fit-content', ...containerStyle }}
    >
        <a
            href={link}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            referrerPolicy='no-referrer'
            rel='noreferrer	'
            style={{ textDecoration: 'none', ...style }}
        >
            {children}
        </a>
    </ActionView>
);

export default Link;
