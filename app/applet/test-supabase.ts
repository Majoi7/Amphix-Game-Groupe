import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gugnlnzrkfkvqlouhhjo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1Z25sbnpya2ZrdnFsb3VoaGpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MTQ3OTgsImV4cCI6MjA5MzQ5MDc5OH0.fMnJX89ZzGa5Qt_52hn1EDq-KDGPgiC4c1RYXK4k0wU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase.from('sessions').select('*').limit(1);
  console.log('Data:', data);
  console.log('Item keys:', data?.[0] ? Object.keys(data[0]) : 'no items');
}

test();
