import { useRef, FC } from 'react';
import useOutsideClick from 'src/controls/hooks/outside-click';
import { BreakPoint } from '../../nuclei/BreakPoint';
import { IconButton } from '../../molecules/IconButton';
import { Divider } from '../../nuclei/Divider';

export interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    color?: React.CSSProperties['color'];
    backgroundColor?: React.CSSProperties['backgroundColor'];
    children: React.ReactNode;
}

const Modal: FC<IProps> = ({
    open,
    setOpen,
    color,
    backgroundColor,
    children,
}) => {
    const modalRef = useRef<any>(null);
    const modalMobileRef = useRef<any>(null);

    useOutsideClick(
        modalRef,
        () => {
            if (open) setOpen(false);
        },
        modalMobileRef
    );

    const renderContents = () => (
        <>
            <IconButton
                iconType='s2'
                iconName='close'
                iconColor={color ?? 'black'}
                buttonSize='sm'
                buttonColor='transparent'
                onClick={() => setOpen(!open)}
                style={{ marginLeft: 'auto', width: 'fit-content' }}
            />
            <Divider
                thickness='100%'
                color={color ?? 'black'}
                style={{ margin: '10px 0' }}
            />
            <div style={{ overflowY: 'auto', flex: 1 }}>{children}</div>
        </>
    );

    if (!open) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,0.6)',
                width: '100vw',
                height: '100vh',
                zIndex: 20000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <BreakPoint maxType='sm'>
                <div
                    ref={modalMobileRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: backgroundColor ?? 'white',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {renderContents()}
                </div>
            </BreakPoint>
            <BreakPoint minType='sm'>
                <div
                    ref={modalRef}
                    style={{
                        width: '60%',
                        height: '75%',
                        backgroundColor: backgroundColor ?? 'white',
                        minHeight: 500,
                        borderRadius: 25,
                        padding: 15,
                        maxWidth: 530,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {renderContents()}
                </div>
            </BreakPoint>
        </div>
    );
};

export default Modal;
