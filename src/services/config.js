import {createClient} from "@supabase/supabase-js";

const instance = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
);


export default instance;
