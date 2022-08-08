import { FC } from 'react';
import { Spinner } from '../../atoms/Spinner';

export interface IProps {
    type?: 'linear' | 'circular';
}

const Progress: FC<IProps> = ({ type = 'circular' }: IProps) => {
    switch (type) {
        case 'circular':
        default:
            return <Spinner />;
    }
};

export default Progress;
