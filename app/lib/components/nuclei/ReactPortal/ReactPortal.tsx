import { FC, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

export interface IProps {
    id: string;
    parent?: HTMLElement;
    className?: string;
}

const ReactPortal: FC<IProps> = ({ children, id, parent, className }) => {
    const containerEl = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        const targetEl = parent ?? document.body;

        containerEl.id = id;
        if (className) containerEl.classList.add(className);

        targetEl.appendChild(containerEl);

        return () => {
            targetEl.removeChild(containerEl);
        };
    }, [className, containerEl, id, parent]);

    return createPortal(children, containerEl);
};

export default ReactPortal;
