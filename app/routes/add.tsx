import { Form } from '@remix-run/react';

export default () => {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }} className='flex flex-col items-center justify-center min-h-screen gap-8 text-white bg-slate-600'>
            <h1 className='text-2xl font-bold'>Register a Smart Contract</h1>
            <Form method='post' action='/contract/add' className='flex flex-col items-center justify-center gap-3 w-72'>
                <label className='w-full'>
                    Contract Name:<br/>
                    <input type='text' name='name' id='name' className='w-full text-black border-2' />
                </label>
                <label className='w-full'>
                    Contract Address:<br/>
                    <input type='text' name='address' id='address' className='w-full text-black border-2' />
                </label>
                <label className='w-full'>
                    Contract JsonAbi:<br/>
                    <textarea name='jsonAbi' id='jsonAbi' className='w-full text-black border-2' rows={8} />
                </label>
                <label className='w-full'>
                    Chain Id (hex string):<br/>
                    <input type='text' name='chainId' id='chainId' className='w-full text-black border-2' />
                </label>
                <button type='submit' className='w-full px-4 py-2 mt-5 text-white border-2 hover:bg-slate-700'>Submit</button>
            </Form>
        </div>
    );
};
