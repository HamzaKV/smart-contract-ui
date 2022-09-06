import { createClient } from '@supabase/supabase-js';

const Supabase = () => {
    // Create a single supabase client for interacting with your database
    const client = createClient(
        'https://arrvavrzysbovavshwcr.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFycnZhdnJ6eXNib3ZhdnNod2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI0MTExNTgsImV4cCI6MTk3Nzk4NzE1OH0.iCiwHq4SK_x4wAs35iiIJ2_YZWlU5s-5isGxQnWe1xw'
    );

    return client;
};

export default Supabase();
