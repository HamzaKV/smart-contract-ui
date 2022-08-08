import { Form } from '@remix-run/react';

export default () => {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
            <h1 className='text-2xl font-bold'>Smart Contract Interaction</h1>
            <Form method='post' action='/contract'>
                <label>
                    RPC URL:
                    <input type='text' name='rpcUrl' id='rpcUrl' className='border-2' />
                </label>
                <br /><br/>
                <label>
                    Contract Address:
                    <input type='text' name='contractAddress' id='contractAddress' className='border-2' />
                </label>
                <br /><br/>
                <label>
                    Contract Abi:
                    <textarea name='contractAbi' id='contractAbi' className='border-2' />
                </label>
                <br /><br/>
                <label>
                    Private Key:
                    <input type='text' name='privateKey' id='privateKey' className='border-2' />
                </label>
                <br /><br/>
                <button type='submit' className='border-2'>Submit</button>
            </Form>
        </div>
    );
};
