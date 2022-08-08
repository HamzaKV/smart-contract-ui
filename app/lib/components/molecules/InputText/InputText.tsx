import { FC, useState, useEffect, useMemo } from 'react';
import { InputField } from '../../atoms/InputField';
import { InputEmail } from '../../atoms/InputEmail';
import { InputPassword } from '../../atoms/InputPassword';
import { TextArea } from '../../atoms/TextArea';
import { Text } from '../../atoms/Text';
import styles from './styles.module.css';

const tags = {
    text: InputField,
    textarea: TextArea,
    email: InputEmail,
    password: InputPassword,
};

export interface IProps {
    initialValue: string;
    label?: string;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    helper?: string;
    labelColor?: React.CSSProperties['color'];
    helperColor?: React.CSSProperties['color'];
    color?: React.CSSProperties['color'];
    maxChars?: number;
    type: keyof typeof tags;
    name: string;
    errorConstraint?: {
        pattern: RegExp | 'string';
        type: Exclude<keyof typeof tags, 'textarea'>; //'text' | 'email' | 'password'
    };
    onInputChange?: (value?: string, error?: boolean) => void;
    rows?: number;
    placeholder?: string;
    onFocusOut?: (name: string, value?: string, error?: boolean) => void;
    controlledValue?: string;
    style?: React.CSSProperties;
    id?: string;
}

const InputText: FC<IProps> = ({
    initialValue,
    label,
    error,
    errorMessage,
    helper,
    labelColor,
    helperColor,
    type,
    name,
    errorConstraint,
    onInputChange,
    rows = 6,
    placeholder,
    color,
    maxChars,
    onFocusOut,
    controlledValue,
    style,
    id,
    disabled
}) => {
    const [value, setValue] = useState(initialValue ?? '');
    const [errorBool, setErrorBool] = useState(error);
    const [chars, setChars] = useState<number>(initialValue?.length ?? 0);

    const Tag = useMemo(() => tags[type], [type]);

    useEffect(() => {
        if (
            controlledValue !== undefined &&
            controlledValue !== null &&
            controlledValue !== value
        ) {
            setValue(controlledValue);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlledValue]);

    const handleChange = (e: any) => {
        const v = e.target.value;
        if (!maxChars || v.length <= maxChars) {
            setValue(v);
            const pattern = errorConstraint?.pattern;
            let errorTmp = false;
            switch (errorConstraint?.type) {
                case 'email':
                    errorTmp = v.match(pattern) ? false : true;
                    break;
                case 'password':
                    errorTmp = v.match(pattern) ? false : true;
                    break;
                case 'text':
                    errorTmp = v.match(pattern) ? true : false;
                    break;
                default:
            }
            setErrorBool(errorTmp);
            if (onInputChange) onInputChange(v, errorTmp);
        }
    };

    const handleOnFocusOut = () => {
        if (errorBool && onFocusOut) onFocusOut(name, value, errorBool);
    };

    useEffect(() => {
        setChars(value.length);
    }, [value]);

    useEffect(() => {
        if (errorBool && !value) {
            setErrorBool(false);
        }
    }, [errorBool, value]);

    return (
        <div
            className={styles.container}
            style={{ margin: '5px 0', width: '100%', ...style }}
        >
            {label && (
                <Text
                    color={labelColor ?? 'black'}
                    type='t7'
                    style={{ marginBottom: 15 }}
                >
                    {label}
                </Text>
            )}
            <div className={styles.inputContainer}>
                <div className={styles.inputInnerContainer}>
                    <Tag
                        className={errorBool ? styles.inputError : styles.input}
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        rows={type === 'textarea' ? rows : 1}
                        style={{ color: color }}
                        onBlur={handleOnFocusOut}
                        id={id}
                        name={name}
                        disabled={disabled}
                    />
                </div>
                {helper && (
                    <Text color={helperColor ?? 'black'} type='t9'>
                        {helper}
                    </Text>
                )}
                {errorBool && (
                    <Text color='red' type='t8'>
                        {errorMessage ?? ''}
                    </Text>
                )}
                {maxChars && (
                    <Text
                        type='t9'
                        color={helperColor ?? 'black'}
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        {maxChars - chars} characters left
                    </Text>
                )}
            </div>
        </div>
    );
};

export default InputText;
