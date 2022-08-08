import { FC, useEffect, useState } from 'react';

export interface IProps {
    children: React.ReactNode;
    state: boolean;
    transition: string;
    exitStyle: React.CSSProperties;
    enterStyle: React.CSSProperties;
    i?: number;
    style?: React.CSSProperties;
}

const Transition: FC<IProps> = ({
    state,
    children,
    transition,
    style,
    exitStyle,
    enterStyle,
}) => {
    const [show, setShow] = useState(state);
    const [anim, setAnim] = useState(state);

    const [, maxDur] = calculateMinMax(transition);

    useEffect(() => {
        if (state && !show && !anim) {
            setShow(true);
            setTimeout(() => {
                setAnim(true);
            }, 100);
        } else if (!state && show && anim) {
            setAnim(false);
            setTimeout(() => {
                setShow(false);
            }, maxDur + 100);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, maxDur]);

    const animStyle = anim ? enterStyle : exitStyle;

    return show ? (
        <div
            style={{
                ...animStyle,
                ...style,
                transition: transition,
            }}
        >
            {children}
        </div>
    ) : null;
};

const calculateMinMax = (transition: any) => {
    const transitions = transition.split(',');
    const values = [];
    for (const t of transitions) {
        const animNumText = t.match(/\d+\.?\d*/g)[0];
        const dur = t.charAt(t.indexOf(animNumText) + animNumText.length);
        const num = +animNumText;
        values.push(caluclateAnim(num, dur));
    }
    return [Math.min(...values), Math.max(...values)];
};

const caluclateAnim = (num: any, dur: string) =>
    dur === 'h'
        ? +num * 3600000
        : dur === 'm'
            ? +num * 60000
            : dur === 's'
                ? +num * 1000
                : +num;

export default Transition;
