import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eohjlgkdyokbiapxkwjh.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvaGpsZ2tkeW9rYmlhcHhrd2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NjE0MzMsImV4cCI6MjA4NDIzNzQzM30.ZGo3XmbDAIXSOkTpzH7Lniu50IJ0gwZZd3ONMthYtTc';

export const supabase = createClient(
    SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: false,
            storage: AsyncStorage,
        },
    }
);