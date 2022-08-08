/* eslint-disable react/display-name */
import { FC, useEffect, forwardRef, useState } from 'react';
import { IconButton } from '../IconButton';

export interface IProps {
    children: React.ReactNode;
    duration?: number;
    type?: 'alert' | 'success' | 'error' | 'warning';
    verticalPosition?: 'top' | 'center' | 'bottom';
    horizontalPosition?: 'right' | 'center' | 'left';
    isOpen?: boolean;
    closeCallback?: () => void;
}

const Snackbar: FC<IProps> = forwardRef(
    (
        {
            children,
            duration = 5000,
            type = 'alert',
            verticalPosition = 'bottom',
            horizontalPosition = 'center',
            isOpen,
            closeCallback,
        },
        ref: any
    ) => {
        const [state, setState] = useState<boolean | null | undefined>(null);

        const typeR =
            state === false || state === true ? type : ref?.current?.type;

        const display = ref?.current
            ? ref.current?.style?.display
            : state === true
                ? 'flex'
                : 'none';

        const close = () => {
            if (ref) ref.current.style.display = 'none';
            else { 
                setState(false);
                closeCallback?.();
            }
        };

        useEffect(() => {
            if (ref) setState(false);
            if (isOpen === true || isOpen === false) setState(isOpen);
            setTimeout(() => {
                close();
            }, duration);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useEffect(() => {
            setState(isOpen);
        }, [isOpen]);

        const style = Object.assign(
            {},
            defaultProps.style,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            types[typeR] ?? types['alert'],
            verticalPositions[verticalPosition],
            horizontalPositions[horizontalPosition],
            {
                display: display,
            }
        );

        return (
            <div ref={ref} style={style}>
                <div style={{ flex: 1 }}>{children}</div>
                <IconButton
                    onClick={() => close()}
                    buttonSize='xs'
                    iconType='s4'
                    iconName='close'
                    buttonColor='transparent'
                    style={{ width: 'fit-content' }}
                />
            </div>
        );
    }
);

export default Snackbar;

const defaultProps = {
    style: {
        position: 'fixed',
        WebkitTransform: 'translate(-50%, -50%)',
        MozTransform: 'translate(-50%, -50%)',
        OTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        padding: '10px 20px',
        minWidth: 350,
        maxWidth: 500,
        display: 'none',
        justifyContent: 'space-between',
        borderRadius: 5,
        maxHeight: 35,
        overflow: 'hidden',
    },
};

const types = {
    alert: {
        backgroundColor: 'grey',
        color: 'white',
    },
    success: {
        backgroundColor: 'green',
        color: 'white',
    },
    warning: {
        backgroundColor: 'orange',
        color: 'white',
    },
    error: {
        backgroundColor: 'red',
        color: 'white',
    },
};

const verticalPositions = {
    top: {
        top: '5%',
    },
    center: {
        top: '50%',
    },
    bottom: {
        top: '95%',
    },
};

const horizontalPositions = {
    left: {
        left: '15%',
    },
    center: {
        left: '50%',
    },
    right: {
        left: '85%',
    },
};
