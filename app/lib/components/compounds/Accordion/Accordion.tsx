import { useRef, useState, FC } from 'react';
import { IconButton } from 'src/components';
import useOutsideClick from 'src/controls/hooks/outside-click';
import styles from './styles.module.css';

export interface IProps {
    Title: React.ReactNode;
    Content: React.ReactNode;
    bgColor: React.CSSProperties['backgroundColor'];
    iconColor: React.CSSProperties['color'];
    excludedRefs?: any[];
}

const Accordion: FC<IProps> = ({
    Title,
    Content,
    bgColor,
    iconColor,
    excludedRefs = [],
}) => {
    const ref = useRef(null);
    const contentRef = useRef(null);
    const [open, setOpen] = useState(false);

    useOutsideClick(
        ref,
        () => {
            if (open) setOpen(false);
        },
        ...excludedRefs
    );

    return (
        <div
            ref={ref}
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    backgroundColor: bgColor,
                    padding: '10px 10px',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: open ? 0 : 10,
                    borderBottomRightRadius: open ? 0 : 10,
                }}
                className={styles.accordionTitle}
                onClick={() => setOpen(!open)}
            >
                {Title}
                <IconButton
                    onClick={() => setOpen(!open)}
                    iconType='s4'
                    buttonSize='xs'
                    iconName={open ? 'upArrow' : 'downArrow'}
                    buttonColor='transparent'
                    iconColor={iconColor}
                    style={{ width: 'fit-content' }}
                />
            </div>
            <div
                ref={contentRef}
                className={styles.accordionContent}
                style={{
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    maxHeight: open ? contentRef.current?.scrollHeight : 0,
                    overflow: 'hidden',
                    backgroundColor: bgColor,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: open ? 10 : 0,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                }}
            >
                {Content}
            </div>
        </div>
    );
};

export default Accordion;
