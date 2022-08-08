import { FC } from 'react';
import { Button, ButtonProps } from '../Button';
import { Icon, IconProps } from '../../atoms/Icon';

export interface IProps {
    onClick: (event?: React.MouseEvent<HTMLElement>) => void;
    buttonSize: ButtonProps['size'];
    buttonColor?: React.CSSProperties['backgroundColor'];
    iconType: IconProps['type'];
    iconName?: IconProps['name'];
    iconColor?: IconProps['color'];
    style?: React.CSSProperties;
}

const IconButton: FC<IProps> = ({
    onClick,
    buttonSize,
    buttonColor,
    iconType,
    iconName,
    iconColor,
    style,
}) => (
    <Button
        onClick={onClick}
        size={buttonSize}
        backgroundColor={buttonColor}
        style={{ margin: 0, padding: 0, ...style }}
    >
        <Icon type={iconType} name={iconName} color={iconColor} />
    </Button>
);

export default IconButton;
