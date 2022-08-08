import { FC } from 'react';

export type IProps = JSX.IntrinsicElements['input'];

const InputField: FC<IProps> = ({ style, ...other }) => (
    <input
        size={1}
        pattern='[ \S]+'
        autoComplete='off'
        style={style}
        {...other}
    />
);

export default InputField;
