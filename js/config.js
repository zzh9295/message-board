const SUPABASE_URL = 'https://ovwylpfgfwgqqfquirnx.supabase.co';  // 替换为你的 Project URL
const SUPABASE_ANON_KEY = 'sb_publishable_wSRNnQqJ-6k0WJ_0XsZubg_NyMjPxTP';  // 替换为你的 anon key

const API_URL = SUPABASE_URL + '/rest/v1';
const HEADERS = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
  'Content-Type': 'application/json'
};