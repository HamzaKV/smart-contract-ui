import { useState, FC } from 'react';
import styles from './styles.module.css';

export interface IProps {
    items: Array<{
        title: string;
        onClick: () => void;
        content: React.ReactNode;
    }>;
    initActive?: number;
    activeColor?: React.CSSProperties['backgroundColor'];
    inactiveColor?: React.CSSProperties['backgroundColor'];
    color?: React.CSSProperties['color'];
}

const Tabs: FC<IProps> = ({
    items,
    initActive,
    activeColor,
    inactiveColor,
    color,
}) => {
    const [active, setActive] = useState<number>(initActive ?? 0);

    const handleTabClick = (index: number): void => {
        setActive(index);
        items[index].onClick();
    };

    return (
        <>
            <div style={{ display: 'flex', marginBottom: 30 }}>
                {items.map((item, key) => (
                    <Tab
                        key={key}
                        title={item.title}
                        onClick={() => handleTabClick(key)}
                        active={key === active}
                        activeColor={activeColor ?? '#009fe3'}
                        inactiveColor={inactiveColor ?? '#8097a8'}
                        color={color ?? 'white'}
                    />
                ))}
            </div>
            {items[active].content}
        </>
    );
};

export default Tabs;

export interface TabProps {
    title: string;
    onClick: () => void;
    active: boolean;
    activeColor: React.CSSProperties['backgroundColor'];
    inactiveColor: React.CSSProperties['backgroundColor'];
    color: React.CSSProperties['color'];
}

const Tab: FC<TabProps> = ({
    title,
    onClick,
    active,
    activeColor,
    inactiveColor,
    color,
}) => (
    <div
        onClick={onClick}
        style={{
            backgroundColor: active ? activeColor : inactiveColor,
            color: color,
        }}
        className={styles.tab}
    >
        {title}
    </div>
);
