import { useNavigate } from '@remix-run/react';

export default () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-center justify-center min-h-screen gap-8 bg-slate-600' style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
            <button onClick={() => navigate('/add')} className='px-4 py-2 text-white border-2 hover:bg-slate-700 w-72'>
                Register Smart Contract
            </button>
            <button onClick={() => navigate('/interaction')} className='px-4 py-2 text-white border-2 hover:bg-slate-700 w-72'>
                Interact with Smart Contract
            </button>
        </div>
    );
};
