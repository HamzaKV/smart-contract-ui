import { useEffect, useState, FC } from 'react';
import { IconButton } from 'src/components';
import { classnames } from 'src/constants/utils';
import styles from './styles.module.css';
import { TransitionGroup, Transition } from 'react-transition-group';

export interface IProps {
    data: any;
    Component: any;
    display: number;
    step?: number;
    autoplay?: boolean;
    height: string | number;
    style?: React.CSSProperties;
    arrowStyle?: {
        backgroundColor: React.CSSProperties['backgroundColor'];
        iconColor: string;
    };
    enableAnimation?: boolean;
}

const Carousel: FC<IProps> = ({
    data,
    Component,
    display,
    step = 1,
    height,
    style,
    arrowStyle,
    autoplay = true,
    enableAnimation = false,
}) => {
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(display);
    const [autoPlay, setAutoPlay] = useState(autoplay);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (autoPlay && enableAnimation) {
            interval = setInterval(() => {
                increase();
            }, 4000);
        }
        return () => {
            clearInterval(interval);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startIndex, endIndex, autoPlay]);

    useEffect(() => {
        setStartIndex(0);
        setEndIndex(display);
    }, [display]);

    const viewedArray = (() => {
        const arr = [];
        for (let i = startIndex; i < endIndex; i++) {
            const remainder = i % data.length;
            if (remainder < 0) {
                arr.push(data.length - Math.abs(remainder));
            } else {
                arr.push(remainder);
            }
        }
        return arr;
    })();

    const increase = () => {
        setStartIndex(startIndex + step);
        setEndIndex(endIndex + step);
    };

    const decrease = () => {
        setStartIndex(startIndex - step);
        setEndIndex(endIndex - step);
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: height,
                ...style,
            }}
            className={styles.carouselContainer}
            onMouseOver={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(autoplay && enableAnimation)}
        >
            <div
                className={classnames(
                    styles.carouselButton,
                    styles.carouselButtonLeft
                )}
                onClick={decrease}
            >
                <IconButton
                    iconType='s3'
                    buttonSize='xs'
                    buttonColor='transparent'
                    iconColor='black'
                    iconName='leftArrow'
                    onClick={decrease}
                />
            </div>
            {enableAnimation ? (
                <TransitionGroup component={null}>
                    {viewedArray.map((value) => (
                        <Transition key={value} timeout={400}>
                            {(state: keyof typeof transitionStyles) => (
                                <div
                                    style={{
                                        ...defaultStyle,
                                        ...transitionStyles[state],
                                    }}
                                >
                                    <Component {...data[value]} />
                                </div>
                            )}
                        </Transition>
                    ))}
                </TransitionGroup>
            ) : (
                <>
                    {viewedArray.map((value) => (
                        // eslint-disable-next-line react/jsx-key
                        <Component {...data[value]} />
                    ))}
                </>
            )}
            <div
                className={classnames(
                    styles.carouselButton,
                    styles.carouselButtonRight
                )}
                onClick={increase}
                style={{ backgroundColor: arrowStyle?.backgroundColor }}
            >
                <IconButton
                    iconType='s3'
                    buttonSize='xs'
                    buttonColor='transparent'
                    iconColor={arrowStyle?.iconColor ?? 'black'}
                    iconName='rightArrow'
                    onClick={increase}
                />
            </div>
        </div>
    );
};

export default Carousel;

const defaultStyle = {
    transition: 'opacity 400ms linear',
    opacity: 0,
};

const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

// const Fade = ({ children, index }) => {
//     const [show, setShow] = useState(false);
//     const [opacity, setOpacity] = useState(0);
//     const intervalRef = useRef<any>();

//     useEffect(() => {
//         setTimeout(() => {
//             setShow(true);
//             intervalRef.current = setInterval(() => {
//                 setOpacity(prev => prev + 0.2);
//             }, 100);
//         }, 800);

//         return () => setTimeout(() => {
//             setShow(false);
//             setOpacity(0);
//             clearInterval(intervalRef.current);
//         }, 0);
//     }, [index]);

//     useEffect(() => {
//         if(opacity > 1) {
//             clearInterval(intervalRef.current);
//         }
//     }, [opacity]);

//     return (
//         <div
//             style={{
//                 opacity: show ? opacity : 0
//             }}
//         >
//             {children}
//         </div>
//     );
// };
