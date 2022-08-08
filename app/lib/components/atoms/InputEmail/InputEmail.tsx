import { FC } from 'react';

export type IProps = JSX.IntrinsicElements['input'];

const InputEmail: FC<IProps> = ({ style, ...other }) => (
    <input type='email' style={style} {...other} />
);

export default InputEmail;
