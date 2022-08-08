import { CSSProperties, FC } from 'react';
import { Text } from 'src/components';

interface IProps {
    initials: string;
    width?: number;
    style?: CSSProperties;
}

const ProfilePicture: FC<IProps> = ({ initials, width }) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: width,
                backgroundColor: 'white',
                height: width,
                borderRadius: '50%',
            }}
        >
            <Text type='t6'>{initials}</Text>
        </div>
    );
};

export default ProfilePicture;
