import { Form } from '@remix-run/react';

export default () => {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
            <h1 className='text-2xl font-bold'>Register a Smart Contract</h1>
            <Form method='post' action='/contract/add'>
                <label>
                    Contract Name:
                    <input type='text' name='name' id='name' className='border-2' />
                </label>
                <br /><br/>
                <label>
                    Contract Address:
                    <input type='text' name='address' id='address' className='border-2' />
                </label>
                <br /><br/>
                <label>
                    Contract Abi:
                    <textarea name='jsonAbi' id='jsonAbi' className='border-2' />
                </label>
                <br /><br/>
                <label>
                    Chain Id:
                    <input type='text' name='chainId' id='chainId' className='border-2' />
                </label>
                <br /><br/>
                <button type='submit' className='border-2'>Submit</button>
            </Form>
        </div>
    );
};
