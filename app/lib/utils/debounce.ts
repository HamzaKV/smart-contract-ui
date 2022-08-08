/**
 * It returns a function that, when called, will call the original function after a delay, unless it's
 * called again before the delay, in which case it will cancel the previous call and start the delay
 * over again.
 * @param fn - The function to be debounced.
 * @param [delay=500] - The amount of time to wait before calling the function.
 * @returns A function that takes in any number of arguments and returns a function that will call the
 * original function after a delay.
 */
const debounce = (fn: (...args: any[]) => any, delay = 500) => {
    let timerId: any;
    return (...args: any[]) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

export default debounce;
