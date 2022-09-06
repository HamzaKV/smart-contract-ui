import { ActionFunction, json } from '@remix-run/node';
import { Supabase } from '~/lib/services/supabase';

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();

    const name = form.get('name') as string;
    const address = form.get('address') as string;
    const chainId = form.get('chainId') as string;
    const jsonAbi = form.get('jsonAbi') as string;

    const { data, error } = await Supabase.from('contracts').insert([
        {
            name,
            address,
            chainId,
            jsonAbi,
        },
    ]);

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ data });
};
