import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://zvecegpilejfmrxnsyvj.supabase.co"
const supabaseKey = process.env.supabase_api_key as string
export const supabase = createClient(supabaseUrl, supabaseKey)
