import { FC } from 'react';
import { Container } from '../../nuclei/Container';

export interface IProps {
    type: 'masonry' | 'even';
    Component: any;
    cols?: number;
    items: { [key: string]: any }[];
    minWidth?: React.CSSProperties['minWidth'];
}

const Grid: FC<IProps> = ({
    type,
    Component,
    cols = 2,
    items,
    minWidth = 300,
}) => {
    const renderCols = () => {
        if (type === 'masonry') {
            return Array.from({ length: cols }, (x, i) => i).map((_, key) => {
                const colItems = items.filter(
                    (_, index) => (index + cols) % cols === key
                );

                return (
                    <div
                        key={key}
                        style={{
                            flex: 1,
                            minWidth: minWidth,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10,
                        }}
                    >
                        {colItems.map((item, key) => (
                            <Component key={key} {...item} />
                        ))}
                    </div>
                );
            });
        } else {
            return items.map((item, key) => <Component key={key} {...item} />);
        }
    };

    return (
        <Container
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
            }}
        >
            {renderCols()}
        </Container>
    );
};

export default Grid;
