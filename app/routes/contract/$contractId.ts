import { LoaderFunction, json } from '@remix-run/node';
import { Supabase } from '~/lib/services/supabase';

export const loader: LoaderFunction = async ({ params }) => {
    const { contractId } = params;

    const { data, error } = await Supabase.from('contracts').select().eq('id', contractId);

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ data });
};
