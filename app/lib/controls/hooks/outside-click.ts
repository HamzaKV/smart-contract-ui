import { useEffect, useRef } from 'react';

/**
 * It calls the callback function when the user clicks outside of the ref element
 * @param {any} ref - The ref of the element you want to detect clicks outside of.
 * @param callback - The function to call when the user clicks outside of the element.
 * @param {any[]} excludedRefs - The refs of the elements you want to exclude from the callback.
 */
const useOutsideClick = (
    ref: any,
    callback: (event: MouseEvent) => void,
    ...excludedRefs: any[]
): void => {
    const callBackRef = useRef<(event: MouseEvent) => void>();
    callBackRef.current = callback;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!ref.current?.contains(event.target) && callBackRef.current) {
                for (const excludedRef of excludedRefs) {
                    if (excludedRef.current?.contains(event.target)) {
                        return;
                    }
                }
                callBackRef.current(event);
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return (): void => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ref, callback, excludedRefs]);
};

export default useOutsideClick;
