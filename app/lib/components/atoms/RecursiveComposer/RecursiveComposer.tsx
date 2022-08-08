import React from 'react';

export interface IProps {
    condition: boolean;
}

const RecursiveComposer: React.FC<IProps> = ({ condition, ...other }) => {
    return condition ? null : (
        <RecursiveComposer condition={condition} {...other} />
    );
};

export default RecursiveComposer;
