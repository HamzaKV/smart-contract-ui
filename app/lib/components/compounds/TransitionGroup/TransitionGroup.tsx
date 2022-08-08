import { useEffect, useState, FC, cloneElement } from 'react';

export interface IProps {
    children: any;
    style?: React.CSSProperties;
}

const TransitionGroup: FC<IProps> = ({ children, style }: IProps) => {
    const [rendered, setRendered] = useState(children);
    const [exiting, setExiting] = useState(false);
    const [entering, setEntering] = useState(false);

    const [, max] = calculateMinMax(children[0].props.transition);

    useEffect(() => {
        if (!exiting && !entering && !sameChildren(children, rendered)) {
            let arr = [...rendered];
            //child thats in rendered but not in children
            for (const child of rendered.filter(
                (c: any) =>
                    !children.find((child: any) => child.props.i === c.props.i)
            )) {
                const index = arr.findIndex((c) => c.props.i === child.props.i);
                arr[index] = cloneElement(arr[index], { state: false });
            }
            //child in children but not in rendered
            for (const child of children.filter(
                (c: any) =>
                    !rendered.find((child: any) => child.props.i === c.props.i)
            )) {
                const indexChildren = children.findIndex(
                    (c: any) => c.props.i === child.props.i
                );
                if (indexChildren < rendered.length - 1) {
                    arr = [cloneElement(child, { state: false }), ...arr];
                } else {
                    arr = [...arr, cloneElement(child, { state: false })];
                }
            }
            setRendered(arr);
            setExiting(true);
        }
    }, [children, rendered, exiting, entering]);

    useEffect(() => {
        if (exiting) {
            setTimeout(() => {
                setEntering(true);
                setExiting(false);
            }, max + 100);
        }
    }, [exiting, max]);

    useEffect(() => {
        if (entering) {
            const arr = [...rendered];
            for (const index in rendered.filter(
                (c: any) =>
                    children.find(
                        (child: any) => child.props.i === c.props.i
                    ) && c.props.state === false
            )) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                arr[index] = cloneElement(rendered[index], {
                    state: true,
                });
            }
            for (const index in arr.filter((c) => c.props.state === false)) {
                arr.splice(+index, 1);
            }
            setEntering(false);
            setRendered(children);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entering]);

    return <div style={style}>{rendered}</div>;
};

export default TransitionGroup;

const sameChildren = (arr1: any, arr2: any) => {
    const comp = arr1.filter((o: any) =>
        arr2.find((t: any) => t.props.i === o.props.i)
    );

    return comp.length === arr1.length && comp.length === arr2.length;
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

const caluclateAnim = (num: any, dur: any) =>
    dur === 'h'
        ? +num * 3600000
        : dur === 'm'
            ? +num * 60000
            : dur === 's'
                ? +num * 1000
                : +num;
