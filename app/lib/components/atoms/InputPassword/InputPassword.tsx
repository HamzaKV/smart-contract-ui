import { FC } from 'react';

export type IProps = JSX.IntrinsicElements['input'];

const InputPassword: FC<IProps> = ({ style, ...other }) => (
    <input type='password' style={style} {...other} />
);

export default InputPassword;
