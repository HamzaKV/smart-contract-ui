/**
 * It takes a list of strings and returns a single string with all the strings separated by a space
 * @param {string[]} args - string[]
 * @returns A function that takes in a variable number of arguments and returns a string of all the
 * arguments joined by a space.
 */
const classNames = (...args: string[]) => {
    const arr = [];
    for (const className of args) {
        arr.push(className);
    }
    return arr.join(' ');
};

export default classNames;
