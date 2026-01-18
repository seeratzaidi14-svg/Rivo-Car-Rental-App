import {createClient} from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eohjlgkdyokbiapxkwjh.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_bg68FXBYbgdHOancu7JJcw_faACGHvH';

export const supabase = createClient(
    SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: false,
        },
    }
);