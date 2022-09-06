import { LoaderFunction, json } from '@remix-run/node';
import { Supabase } from '~/lib/services/supabase';

export const loader: LoaderFunction = async () => {

    const { data, error } = await Supabase.from('contracts').select();

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ data });
};
