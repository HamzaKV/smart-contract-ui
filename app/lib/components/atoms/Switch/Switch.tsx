import { useEffect, useState, FC } from 'react';

export interface IProps {
    width: number;
    activeColor?: React.CSSProperties['color'];
    inactiveColor?: React.CSSProperties['color'];
    knobColor?: React.CSSProperties['color'];
    onChange: (on: boolean) => void;
    initValue?: boolean;
    enabled?: boolean;
}

const Switch: FC<IProps> = ({
    width,
    activeColor = '#009fe3',
    inactiveColor = '#8097a8',
    knobColor = 'white',
    onChange,
    initValue = false,
    enabled = true,
}) => {
    const [on, setOn] = useState(initValue);

    useEffect(() => setOn(initValue), [initValue]);

    const handleSwitch = () => {
        if (enabled) {
            setOn(!on);
            onChange(!on);
        }
    };

    return (
        <div
            style={{
                width: width,
                height: 25,
                backgroundColor: on ? activeColor : inactiveColor,
                position: 'relative',
                borderRadius: 35,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0px 1px',
                border: '1px solid darkgrey',
            }}
            onClick={handleSwitch}
        >
            <div
                style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    backgroundColor: knobColor,
                    left: on ? width - 22 : 0,
                    position: 'absolute',
                    transition: '.4s',
                }}
            ></div>
        </div>
    );
};

export default Switch;
