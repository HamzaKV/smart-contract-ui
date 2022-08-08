import { FC, useState } from 'react';
import styles from './styles.module.css';
import { Text, Icon } from 'src/components';

type TValue = { label: string; value: string };

export interface IProps {
    initialValue: TValue;
    items: Array<TValue>;
    label?: string;
    labelColor?: React.CSSProperties['color'];
    name: string;
    onInputChange?: (value?: TValue, error?: boolean) => void;
    onFocusOut?: (name: string, value?: TValue, error?: boolean) => void;
    color?: React.CSSProperties['color'];
    helperColor?: React.CSSProperties['color'];
}

const Select: FC<IProps> = ({
    label,
    labelColor,
    initialValue,
    items,
    name,
    onInputChange,
    onFocusOut,
    color,
    helperColor,
}) => {
    const [value, setValue] = useState(initialValue.value);

    const handleChange = (e: any) => {
        setValue(e.target.value);
        const itemValue = items.find((item) => item.value === e.target.value);
        if (onInputChange) onInputChange(itemValue);
    };

    const handleBlur = (e: any) => {
        setValue(e.target.value);
        const itemValue = items.find((item) => item.value === e.target.value);
        if (onFocusOut) onFocusOut(name, itemValue);
    };

    return (
        <div className={styles.container} style={{ margin: '5px 0' }}>
            {label && (
                <Text color={labelColor ?? 'black'} type='t7'>
                    {label}
                </Text>
            )}
            <div className={styles.inputContainer}>
                <select
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.input}
                    style={{ color }}
                >
                    {items.map((item, key) => (
                        <option key={key} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <div className={styles.iconContainer}>
                    <Icon
                        type='s4'
                        color={helperColor ?? 'black'}
                        name='downArrow'
                    />
                </div>
            </div>
        </div>
    );
};

export default Select;
