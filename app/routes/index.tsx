import { Form } from '@remix-run/react';

export default () => {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
            <h1>Smart Contract Interaction</h1>
            <Form method='post' action='/contract'>
                <label>
                    RPC URL:
                    <input type='text' name='rpcUrl' id='rpcUrl' />
                </label>
                <br /><br/>
                <label>
                    Contract Address:
                    <input type='text' name='contractAddress' id='contractAddress' />
                </label>
                <br /><br/>
                <label>
                    Contract Abi:
                    <textarea name='contractAbi' id='contractAbi' />
                </label>
                <br /><br/>
                <label>
                    Private Key:
                    <input type='text' name='privateKey' id='privateKey' />
                </label>
                <br /><br/>
                <button type='submit'>Submit</button>
            </Form>
        </div>
    );
};
