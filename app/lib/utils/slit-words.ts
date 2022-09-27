const splitWords = (text: string, numWords: number) => {
    const words = text.split(' ');
    return words.reduce((acc: string[], word: string, index: number) => {
        const line = Math.floor(index / numWords);
        acc[line] = (acc[line] || '') + ' ' + word;
        return acc;
    }, []);
};

export default splitWords;
