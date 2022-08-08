import { FC } from 'react';

export type IProps = JSX.IntrinsicElements['textarea'];

const TextArea: FC<IProps> = ({ style, ...other }) => (
    <textarea style={style} {...other}></textarea>
);

export default TextArea;
