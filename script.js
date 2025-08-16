// ==== Supabase Setup ====
const supabaseUrl = 'https://afiayjdmoorsmsrlslks.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaWF5amRtb29yc21zcmxzbGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMzg1NzIsImV4cCI6MjA3MDkxNDU3Mn0.ULv1VVohSZozvi-ardEjpTfjrkzYsO4Pi2FbuUCPZrk';     
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ==== Funzione per inserire dati nel container ====
function createCard(title, content) {
  const div = document.createElement('div');
  div.className = 'card bg-white bg-opacity-80 p-4 rounded-xl shadow hover:shadow-lg transition';
  div.setAttribute('data-aos', 'fade-up');
  div.innerHTML = `<h3 class="font-bold mb-2">${title}</h3><p>${content}</p>`;
  return div;
}

// ==== Blog Post ====
async function loadBlogPosts() {
  const { data, error } = await supabase.from('blog_post').select('*').order('id', { ascending: false });
  const container = document.getElementById('news-container');
  if (error) {
    console.error(error);
    document.getElementById('news-error').classList.remove('hidden');
    return;
  }
  container.innerHTML = '';
  data.forEach(post => {
    const card = createCard(post.title, post.content);
    container.appendChild(card);
  });
}

// ==== About Me ====
async function loadAboutMe() {
  const { data, error } = await supabase.from('about_me').select('*');
  const container = document.querySelector('#about .grid');
  if (error) {
    console.error(error);
    return;
  }
  container.innerHTML = '';
  data.forEach(item => {
    const card = createCard(item.title, item.description);
    container.appendChild(card);
  });
}

// ==== Daily News ====
async function loadDailyNews() {
  const { data, error } = await supabase.from('daily_news').select('*').order('id', { ascending: false });
  const container = document.getElementById('video-container');
  if (error) {
    console.error(error);
    document.getElementById('video-error').classList.remove('hidden');
    return;
  }
  container.innerHTML = '';
  data.forEach(news => {
    const card = createCard(news.title, news.content);
    container.appendChild(card);
  });
}

// ==== Archive ====
async function loadArchive() {
  const { data, error } = await supabase.from('archive').select('*').order('id', { ascending: false });
  const container = document.getElementById('archive-container');
  if (!container) return; // crea solo se presente
  if (error) {
    console.error(error);
    return;
  }
  container.innerHTML = '';
  data.forEach(item => {
    const card = createCard(item.title, item.content);
    container.appendChild(card);
  });
}

// ==== History ====
async function loadHistory() {
  const { data, error } = await supabase.from('history').select('*').order('id', { ascending: false });
  const container = document.getElementById('history-container');
  if (!container) return;
  if (error) {
    console.error(error);
    return;
  }
  container.innerHTML = '';
  data.forEach(item => {
    const card = createCard(item.title, item.content);
    container.appendChild(card);
  });
}

// ==== Simulators ====
async function loadSimulators() {
  const { data, error } = await supabase.from('simulators').select('*').order('id', { ascending: false });
  const container = document.getElementById('simulators-container');
  if (!container) return;
  if (error) {
    console.error(error);
    return;
  }
  container.innerHTML = '';
  data.forEach(item => {
    const card = createCard(item.name, item.description);
    container.appendChild(card);
  });
}

// ==== Avvio caricamento dati ====
window.addEventListener('DOMContentLoaded', () => {
  loadBlogPosts();
  loadAboutMe();
  loadDailyNews();
  loadArchive();
  loadHistory();
  loadSimulators();
});
