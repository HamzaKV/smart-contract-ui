import { ActionFunction, json } from '@remix-run/node';
import { useActionData, useFetcher, useNavigate } from '@remix-run/react';
import { Fragment, useEffect, useMemo, useState } from 'react';

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();

    const rpcUrl = form.get('rpcUrl');
    const privateKey = form.get('privateKey');
    const contractAddress = form.get('contractAddress');
    const contractAbi = form.get('contractAbi');

    return json({ privateKey, contractAddress, contractAbi, rpcUrl });
};

export default () => {
    const actionData = useActionData();
    const [state, setState] = useState<string[]>([]);
    const fetcher = useFetcher();
    const navigate = useNavigate();

    const abi = useMemo(
        () => actionData && JSON.parse(actionData.contractAbi),
        [actionData]
    );

    useEffect(() => {
        if (fetcher.data) {
            console.log(fetcher.data);
        }
    }, [fetcher.data]);

    return (
        <div className='flex h-screen overflow-hidden text-white bg-slate-600'>
            <div className='flex flex-col items-center h-full py-4 overflow-auto grow'>
                <button
                    className='px-4 py-2 text-white border-2 hover:bg-slate-700 w-72'
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </button>
                {abi?.map((data: any, key: number) => {
                    const { name, stateMutability, inputs, type: t } = data;

                    if (t === 'constructor' || t === 'event') return null;

                    return (
                        <div
                            key={key}
                            className='flex flex-col items-center justify-center gap-3 w-72 mt-7'
                        >
                            <h1>{name}</h1>
                            {inputs.map((v: any, k: number) => {
                                const { name: n, type } = v;

                                return (
                                    <Fragment key={k}>
                                        <label className='w-full'>
                                            {n || 'Arg'} - ({type}):
                                            <br />
                                            <input
                                                className='w-full text-black border-2'
                                                type='text'
                                                name={n}
                                                id={n}
                                                onChange={(e) =>
                                                    setState(
                                                        (prev: string[]) => [
                                                            ...prev,
                                                            e.target.value,
                                                        ]
                                                    )
                                                }
                                            />
                                        </label>
                                    </Fragment>
                                );
                            })}
                            <button
                                className='flex flex-col items-center justify-center gap-3 border-2 w-72'
                                onClick={() =>
                                    fetcher.submit(
                                        {
                                            ...actionData,
                                            call: String(
                                                stateMutability === 'view'
                                            ),
                                            method: name,
                                            args: JSON.stringify(state),
                                        },
                                        {
                                            method: 'post',
                                            action: '/transaction',
                                        }
                                    )
                                }
                            >
                                Submit
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className='bg-black grow p-14 max-w-[50%] truncate h-screen overflow-auto'>
                {fetcher.state === 'submitting' && (
                    <pre className='text-white'>Submitting...</pre>
                )}
                {fetcher.type === 'done' && fetcher.data && (
                    <pre className='text-white'>
                        {JSON.stringify(fetcher.data, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    );
};
