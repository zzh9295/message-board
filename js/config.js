const SUPABASE_URL = 'SUPABASE_URL';  // 替换为你的 Project URL
const SUPABASE_ANON_KEY = 'SUPABASE_ANON_KEY';  // 替换为你的 anon key

const API_URL = SUPABASE_URL + '/rest/v1';
const HEADERS = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
  'Content-Type': 'application/json'
};