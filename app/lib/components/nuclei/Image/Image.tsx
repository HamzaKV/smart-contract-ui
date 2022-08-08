import { useEffect, useState, FC } from 'react';
import styles from './styles.module.css';

export type IProps = JSX.IntrinsicElements['img'];

const placeHolder =
    // eslint-disable-next-line max-len
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

//TODO: add responsive similar to Text

const Image: FC<IProps> = ({ alt = 'image', src, style, ...other }) => {
    const [imageSrc, setImageSrc] = useState<any>(placeHolder);
    const [imageRef, setImageRef] = useState<any>();

    const onLoad = (event: any) => {
        event.target.classList.add('loaded');
    };

    const onError = (event: any) => {
        setImageSrc(placeHolder);
    };

    useEffect(() => {
        let observer: IntersectionObserver;
        let didCancel = false;

        if (imageRef && imageSrc !== src) {
            if (IntersectionObserver) {
                observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (
                                !didCancel &&
                                (entry.intersectionRatio > 0 ||
                                    entry.isIntersecting)
                            ) {
                                setImageSrc(src);
                                observer.unobserve(imageRef);
                            }
                        });
                    },
                    {
                        threshold: 0.01,
                        rootMargin: '75%',
                    }
                );
                observer.observe(imageRef);
            } else {
                setImageSrc(src);
            }
        }

        return () => {
            didCancel = true;
            if (observer && observer.unobserve) {
                observer.unobserve(imageRef);
            }
        };
    }, [src, imageSrc, imageRef]);

    return (
        <img
            ref={setImageRef}
            alt={alt}
            src={imageSrc}
            className={styles.image}
            style={Object.assign({}, defaultStyles.root, style)}
            onLoad={onLoad}
            onError={onError}
            {...other}
        />
    );
};

const defaultStyles = {
    root: {
        borderRadius: 'inherit',
        width: 100,
        height: 100,
        display: 'block',
    },
};

export default Image;
