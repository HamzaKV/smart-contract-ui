import { useState, useEffect } from 'react';

const imageAddr = 'https://picsum.photos/id/866/4000/4000';
const downloadSize = 659000; //bytes

let startTime: number, endTime: number;
const download = new Image();

/**
 * It returns an object with two properties: online and speed. The online property is a boolean that
 * indicates whether the user is online or not. The speed property is a number that indicates the
 * user's internet speed in Mbps
 * @returns An object with two properties: online and speed.
 */
const useNetworkState = () => {
    const [network, setNetwork] = useState({
        online: true,
        speed: 0,
    });

    const updateNetwork = () =>
        setNetwork({
            ...network,
            online: window.navigator.onLine,
        });

    useEffect(() => {
        const showResults = () => {
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = downloadSize * 8;
            const speedBps: number = +(bitsLoaded / duration).toFixed(2);
            const speedKbps: number = +(speedBps / 1024).toFixed(2);
            const speedMbps: number = +(speedKbps / 1024).toFixed(2);

            setNetwork({
                ...network,
                speed: speedMbps,
            });
        };

        startTime = new Date().getTime();
        const cacheBuster = '?nnn=' + startTime;

        download.onload = () => {
            endTime = new Date().getTime();
            showResults();
        };

        download.onerror = (err, msg) => {
            setNetwork({
                ...network,
                speed: 0,
            });
        };

        download.src = imageAddr + cacheBuster;

        window.addEventListener('offline', updateNetwork);
        window.addEventListener('online', updateNetwork);

        return () => {
            window.removeEventListener('offline', updateNetwork);
            window.removeEventListener('online', updateNetwork);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return network;
};

export default useNetworkState;
