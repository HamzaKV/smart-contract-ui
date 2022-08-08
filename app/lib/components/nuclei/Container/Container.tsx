import { FC } from 'react';

export type IProps = JSX.IntrinsicElements['div'];

const Container: FC<IProps> = ({ children, style, ...other }) => (
    <div style={Object.assign({}, defaultProps.style, style)} {...other}>
        {children}
    </div>
);

const defaultProps = {
    style: {
        display: 'flex',
        flexDirection: 'column',
        // width: 'max-content'
    },
};

export default Container;
