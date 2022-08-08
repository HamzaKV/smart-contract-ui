import React, { FC, useEffect, useState } from 'react';
import { Button } from '../Button';
import { Text } from '../../atoms/Text';
import styles from './styles.module.css';

export interface IProps {
    initialValue: number;
    label?: string;
    error?: boolean;
    errorMessage?: string;
    labelColor?: React.CSSProperties['color'];
    helperColor?: React.CSSProperties['color'];
    color?: React.CSSProperties['color'];
    name: string;
    onInputChange?: (value?: number, error?: boolean) => void;
    onFocusOut?: (name: string, value?: number, error?: boolean) => void;
    min?: number;
    max?: number;
    step?: number;
}

//TODO: on blur does not work when entire component is unfocused

const InputNumber: FC<IProps> = ({
    min,
    max,
    step,
    label,
    initialValue,
    error,
    errorMessage,
    labelColor,
    helperColor,
    color,
    name,
    onInputChange,
    onFocusOut,
}) => {
    const [value, setValue] = useState(initialValue ?? 1);
    const [errorBool, setErrorBool] = useState(error);

    useEffect(() => {
        if (onInputChange)
            onInputChange(value, errorBool);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleBlur = () => {
        if (onFocusOut) onFocusOut(name, value, errorBool);
    };

    return (
        <div className={styles.container} style={{ margin: '5px 0' }}>
            {label && (
                <Text color={labelColor ?? 'black'} type='t7'>
                    {label}
                </Text>
            )}
            <div className={styles.inputContainer}>
                <div className={styles.inputInnerContainer}>
                    <input
                        type='number'
                        className={errorBool ? styles.inputError : styles.input}
                        value={value}
                        onBlur={handleBlur}
                        style={{ flex: 1, color }}
                        onChange={(e) => {
                            const newValue = +e.target.value;
                            if (max && newValue > max) return;
                            if (min && newValue < min) return;
                            setValue(newValue);
                        }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: '0 15px 0 0',
                        }}
                    >
                        <Button
                            backgroundColor='transparent'
                            size='xs'
                            onClick={() => {
                                if (max !== undefined && max !== null) {
                                    if (value < max)
                                        setValue(value + (step ?? 1));
                                } else {
                                    setValue(value + (step ?? 1));
                                }
                            }}
                            style={{
                                width: 'fit-content',
                                padding: '0 5px',
                            }}
                        >
                            <Text
                                type='t7'
                                color={helperColor ?? 'black'}
                                style={{ fontWeight: 'bold' }}
                            >
                                +
                            </Text>
                        </Button>
                        <Button
                            backgroundColor='transparent'
                            size='xs'
                            onClick={() => {
                                if (min !== undefined && min !== null) {
                                    if (value > min)
                                        setValue(value - (step ?? 1));
                                } else {
                                    setValue(value - (step ?? 1));
                                }
                            }}
                            style={{
                                width: 'fit-content',
                                padding: '0 5px',
                            }}
                        >
                            <Text
                                type='t7'
                                color={helperColor ?? 'black'}
                                style={{ fontWeight: 'bold' }}
                            >
                                -
                            </Text>
                        </Button>
                    </div>
                </div>
                {errorBool && (
                    <Text color='red' type='t8'>
                        {errorMessage ?? ''}
                    </Text>
                )}
            </div>
        </div>
    );
};

export default InputNumber;
