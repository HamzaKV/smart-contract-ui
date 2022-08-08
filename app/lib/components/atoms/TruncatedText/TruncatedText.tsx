import { FC } from 'react';
import { Text as BaseText } from '../../nuclei/Text';

const fontSizes = {
    t1: '3rem',
    t2: '2.5rem',
    t3: '2.25rem',
    t4: '2rem',
    t5: '1.75rem',
    t6: '1.5rem',
    t7: '1.25rem',
    t8: '1rem',
    t9: '0.75rem',
    t10: '0.5rem',
};

export interface IProps {
    children: React.ReactNode;
    type: keyof typeof fontSizes;
    color?: string;
    style?: React.CSSProperties;
    className?: string;
    responsive?: boolean;
}

const Text: FC<IProps> = ({
    children,
    type,
    color,
    style,
    className,
    responsive,
}) => (
    <BaseText
        style={{
            fontSize: fontSizes[type] ?? fontSizes['t8'],
            color: color,
            width: 'fit-content',
            ...style,
        }}
        className={className}
        responsive={responsive}
    >
        {children}
    </BaseText>
);

export default Text;
