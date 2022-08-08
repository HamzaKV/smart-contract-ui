import { FC } from 'react';

export interface IProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    responsive?: boolean;
}

const Text: FC<IProps> = ({
    children,
    style,
    className,
    responsive,
}: IProps) => {
    const { style: style2, fontSize } = style
        ? calcFont(style, responsive)
        : {
            style: {
                display: 'flex',
                alignItems: 'center',
            },
            fontSize: '1rem',
        };

    return (
        <div className={className} style={{ ...style2, fontSize: fontSize }}>
            {children}
        </div>
    );
};

export default Text;

const calcFont = (
    style: React.CSSProperties,
    responsive?: boolean
): {
    style: React.CSSProperties;
    fontSize: string;
} => {
    const style2: React.CSSProperties = Object.assign(
        {},
        defaultProps.style,
        style
    );
    const unit: string =
        typeof style2.fontSize === 'string'
            ? style2.fontSize.match(/[^0-9.]+/g)?.[0] ?? 'px'
            : 'px';
    const x: number = +(typeof style2.fontSize === 'string'
        ? Number(style2.fontSize.replace(/[^0-9.]+/g, ''))
        : style2.fontSize ?? 0);
    const minSize: number = Math.pow(2, 1.1 * x - 3) + 0.375;
    const fontSize: string = responsive
        ? `clamp(${minSize + unit}, 4vw, ${x + unit})`
        : x + unit;

    return { style: style2, fontSize };
};

const defaultProps = {
    children: process.env.NODE_ENV === 'development' ? 'Lorem Ipsum' : '',
    style: {
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        // width: 'max-content'
    },
};

/**
 * 2^{\left(1.1x\ -\ 3\right)}+0.375
 * 'h1'
| 'h2'
| 'h3'
| 'h4'
| 'h5'
| 'h6'
| 'subtitle1'
| 'subtitle2'
| 'body1'
| 'body2'
| 'caption'
| 'button'
| 'overline'
| 'srOnly'
| 'inherit'
 */
