import { useNavigate } from '@remix-run/react';

export default () => {
    const navigate = useNavigate();

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
            <button onClick={() => navigate('/add')}>
                Register Smart Contract
            </button>
            <button onClick={() => navigate('/interaction')}>
                Interact with Smart Contract
            </button>
        </div>
    );
};
