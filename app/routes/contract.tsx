import { ActionFunction, json } from '@remix-run/node';
import { useActionData, useFetcher, useNavigate } from '@remix-run/react';
import { Fragment, useMemo, useState } from 'react';

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

    return (
        <div>
            <button onClick={() => navigate('/')}>Go Back</button>
            <br />
            <br />
            {abi?.map((data: any, key: number) => {
                const { name, stateMutability, inputs, type: t } = data;

                if (t === 'constructor' || t === 'event') return null;

                return (
                    <div key={key}>
                        <h1>{name}</h1>
                        {inputs.map((v: any, k: number) => {
                            const { name: n, type } = v;

                            return (
                                <Fragment key={k}>
                                    <label>
                                        {n || 'Arg'} - ({type}):
                                        <input
                                            type='text'
                                            name={n}
                                            id={n}
                                            onChange={(e) =>
                                                setState((prev: string[]) => [
                                                    ...prev,
                                                    e.target.value,
                                                ])
                                            }
                                        />
                                    </label>
                                    <br />
                                    <br />
                                </Fragment>
                            );
                        })}
                        <button
                            onClick={() =>
                                fetcher.submit({
                                    ...actionData,
                                    call: String(stateMutability === 'view'),
                                    method: name,
                                    args: JSON.stringify(state),
                                }, {
                                    method: 'post',
                                    action: '/transaction'
                                })
                            }
                        >
                            Submit
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
