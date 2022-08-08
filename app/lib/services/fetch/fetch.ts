const Fetch = (
    url: string,
    options: {
        method: string;
        headers?: any;
        body?: string | FormData;
    },
    json = true,
    config?: { MAX_FETCH_TIME: number }
): Promise<any> =>
    new Promise((resolve, reject) => {
        const controller = new AbortController();
        const maxTime: number = config?.MAX_FETCH_TIME ?? 10000;

        const timer = setTimeout(() => {
            controller.abort();
            clearTimeout(timer);
            reject({ message: 'Timeout' });
        }, maxTime);

        fetch(url, { ...options, signal: controller.signal })
            .then((response) => {
                if (response?.status >= 400 && response?.status <= 599) {
                    throw response;
                } else if (json) {
                    return response.json();
                } else {
                    resolve(response);
                }
            })
            .then(({ data, error }) => {
                if (data) {
                    if (data.error) throw data.error;
                    else resolve(data);
                } else {
                    throw error ?? { message: 'Not Defined' };
                }
            })
            .catch((error) => reject(error));
    });

export default Fetch;
