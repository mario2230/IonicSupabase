import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY


if(!supabaseUrl) {
    throw new Error(
        'Faltando informações do ENV'
    )
}

if(!supabaseKey) {
    throw new Error(
        'Faltando informações do ENV'
    )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
