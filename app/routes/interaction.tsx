import { Form } from '@remix-run/react';

export default () => {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }} className='flex flex-col items-center justify-center min-h-screen gap-8 text-white bg-slate-600'>
            <h1 className='text-2xl font-bold'>Smart Contract Interaction</h1>
            <Form method='post' action='/contract-ui' className='flex flex-col items-center justify-center gap-3 w-72'>
                <label className='w-full'>
                    RPC URL:<br/>
                    <input type='text' name='rpcUrl' id='rpcUrl' className='w-full text-black border-2' />
                </label>
                <label className='w-full'>
                    Contract Address:<br/>
                    <input type='text' name='contractAddress' id='contractAddress' className='w-full text-black border-2' />
                </label>
                <label className='w-full'>
                    Contract Abi:<br/>
                    <textarea rows={10} name='contractAbi' id='contractAbi' className='w-full text-black border-2' />
                </label>
                <label className='w-full'>
                    Private Key:<br/>
                    <input type='text' name='privateKey' id='privateKey' className='w-full text-black border-2' />
                </label>
                <button type='submit' className='w-full px-4 py-2 mt-5 text-white border-2 hover:bg-slate-700'>Submit</button>
            </Form>
        </div>
    );
};
