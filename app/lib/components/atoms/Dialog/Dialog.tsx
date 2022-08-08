import { FC, useRef } from 'react';
import { ReactPortal } from '../../nuclei/ReactPortal';
import { BreakPoint } from '../../nuclei/BreakPoint';
import useOutsideClick from 'src/controls/hooks/outside-click';

export interface IProps {
    open: boolean;
    style?: React.CSSProperties;
    className?: string;
    openCallback: (open: boolean) => void;
    containerStyle?: React.CSSProperties;
    containerClassName?: string;
}

const Dialog: FC<IProps> = ({
    open,
    openCallback,
    children,
    style,
    className,
    containerStyle,
    containerClassName,
}) => {
    const ref = useRef<HTMLDivElement>();

    useOutsideClick(ref, () => {
        if (open) openCallback(false);
    });

    if (!open) return null;

    return (
        <ReactPortal id='dialog-portal'>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 999999999,
                    background: 'rgba(51, 51, 51, 0.3)',
                    backdropFilter: 'blur(1px)',
                    width: '100%',
                    height: '100%',
                    display: open ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...containerStyle,
                }}
                className={containerClassName}
            >
                <BreakPoint minType='sm'>
                    <div
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        ref={ref}
                        style={{
                            backgroundColor: 'white',
                            width: '40%',
                            padding: 25,
                            ...style,
                        }}
                        className={className}
                    >
                        {children}
                    </div>
                </BreakPoint>
                <BreakPoint maxType='sm'>
                    <div
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        ref={ref}
                        style={{
                            backgroundColor: 'white',
                            width: '100%',
                            height: '100%',
                            maxHeight: '100vh',
                            padding: 25,
                            ...style,
                        }}
                        className={className}
                    >
                        {children}
                    </div>
                </BreakPoint>
            </div>
        </ReactPortal>
    );
};

export default Dialog;
