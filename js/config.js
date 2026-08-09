const SUPABASE_URL = 'SUPABASE_URL_PLACEHOLDER';  // 部署时由 GitHub Actions 自动替换
const SUPABASE_ANON_KEY = 'SUPABASE_ANON_KEY_PLACEHOLDER';  // 部署时由 GitHub Actions 自动替换

const API_URL = SUPABASE_URL + '/rest/v1';
const HEADERS = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
  'Content-Type': 'application/json'
};