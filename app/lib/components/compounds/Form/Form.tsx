import { useRef, useState, useEffect, FC } from 'react';
import { Button } from '../../molecules/Button';
import { InputText, InputTextProps } from '../../molecules/InputText';

export interface IProps {
    formFields: Array<{
        type: InputTextProps['type'];
        label: string;
        name: string;
        error?: InputTextProps['errorConstraint'] & {
            message: string;
            maxChars?: number;
        };
        placeholder?: string;
        helper?: string;
        // required: boolean;
        onFocusOut?: (name: string, value?: any, error?: boolean) => void;
        value?: string;
        id?: string;
    }>;
    showSubmitButton?: boolean;
    cols?: number;
    formChange?: (form: any) => void;
    formSubmit: (form: any) => void;
    style?: React.CSSProperties;
    formStyle?: React.CSSProperties;
}

const Form: FC<IProps> = ({
    formFields,
    cols,
    formChange,
    formSubmit,
    showSubmitButton,
    style,
    formStyle,
}) => {
    let { current: form } = useRef<any>(
        (() => {
            if (formFields && formFields.length > 0 && formFields[0]) {
                const formObj: any = {};
                for (const field of formFields) {
                    formObj[field.name] = {
                        value: null,
                        error: false,
                    };
                }
                return formObj;
            }
        })()
    );
    const [columns, setColumns] = useState<string>(colFormat(cols ?? 1));

    useEffect(() => {
        setColumns(colFormat(cols ?? 1));
    }, [cols]);

    const setForm = (newValue: any) => {
        form = newValue;
    };

    const validForm = (f: any) => {
        let valid = true;
        for (const key in f) {
            const field = f[key];
            if (!field.value || field.error) {
                valid = false;
                break;
            }
        }
        return valid;
    };

    const onSubmit = () => {
        if (validForm(form)) formSubmit(form);
    };

    const onChange = (name: string, value: any, error: any) => {
        const tmpForm = { ...form, [name]: { value, error: error } };
        setForm(tmpForm);
        if (validForm(tmpForm) && formChange) formChange(form);
    };

    const handleKeyDown = (event: any) => {
        const key = event.key;
        if (key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <div
            onKeyDown={handleKeyDown}
            style={{
                display: 'grid',
                gridTemplateColumns: columns,
                ...formStyle,
            }}
        >
            {formFields.map((field, key) => {
                switch (field.type) {
                    case 'email':
                    case 'password':
                    case 'text':
                    case 'textarea':
                    default:
                        return (
                            <InputText
                                id={field.id}
                                key={key}
                                name={field.name}
                                label={field.label}
                                labelColor={style?.color}
                                helperColor={style?.color ?? 'black'}
                                type={field.type}
                                onInputChange={(v, e) =>
                                    v && handleInput(field.name, v, e, onChange)
                                }
                                error={form[field.name]?.error}
                                errorMessage={field.error?.message}
                                errorConstraint={field?.error}
                                placeholder={field?.placeholder}
                                initialValue={form[field.name]?.value}
                                helper={field?.helper}
                                maxChars={field?.error?.maxChars}
                                onFocusOut={field?.onFocusOut}
                                style={{
                                    marginTop: 20,
                                    marginLeft: style?.marginLeft ?? 0,
                                    marginRight: style?.marginRight ?? 0,
                                }}
                            />
                        );
                }
            })}
            {showSubmitButton && (
                <Button
                    style={{
                        width: cols === 1 ? undefined : 150,
                        borderRadius: 8,
                        marginTop: 20,
                        marginBottom: 5,
                        marginLeft: style?.marginLeft ?? 0,
                        marginRight: style?.marginRight ?? 0,
                        backgroundColor: '#6F7272',
                    }}
                    fontColor={'white'}
                    onClick={onSubmit}
                    size={'md'}
                >
                    Submit
                </Button>
            )}
        </div>
    );
};

export default Form;

const colFormat = (cols: number): string => {
    let str = '1fr';
    for (let i = 1; i < cols; i++) {
        str += ' 1fr';
    }
    return str;
};

const handleInput = (
    name: string,
    value: InputTextProps['name'],
    error: InputTextProps['error'],
    formChange?: (
        name: string,
        value: InputTextProps['name'],
        error: InputTextProps['error']
    ) => void
): void => {
    if (formChange) formChange(name, value, error);
};
