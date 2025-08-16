// ================================
// 1️⃣ Inizializzazione Supabase
// ================================
const supabaseUrl = 'https://afiayjdmoorsmsrlslks.supabase.co'; // sostituisci con il tuo URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaWF5amRtb29yc21zcmxzbGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMzg1NzIsImV4cCI6MjA3MDkxNDU3Mn0.ULv1VVohSZozvi-ardEjpTfjrkzYsO4Pi2FbuUCPZrk';     // sostituisci con la tua ANON KEY
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ================================
// 2️⃣ Funzione per caricare Blog Posts
// ================================
async function loadBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('Errore caricamento blog:', error);
    return;
  }

  const container = document.getElementById('blog-container');
  if (!container) return;

  container.innerHTML = ''; // pulisci prima di inserire
  data.forEach(post => {
    const div = document.createElement('div');
    div.className = 'blog-post p-4 mb-4 bg-white bg-opacity-80 rounded shadow';
    div.innerHTML = `
      <h3 class="font-bold text-xl mb-2">${post.title}</h3>
      <p>${post.content}</p>
    `;
    container.appendChild(div);
  });
}

// ================================
// 3️⃣ Funzione per caricare Daily News
// ================================
async function loadDailyNews() {
  const { data, error } = await supabase
    .from('daily_news')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('Errore caricamento news:', error);
    const errMsg = document.getElementById('news-error');
    if (errMsg) errMsg.classList.remove('hidden');
    return;
  }

  const container = document.getElementById('news-container');
  if (!container) return;

  container.innerHTML = ''; // pulisci prima di inserire
  data.forEach(news => {
    const div = document.createElement('div');
    div.className = 'news-item p-4 mb-4 bg-white bg-opacity-80 rounded shadow';
    div.innerHTML = `
      <h4 class="font-semibold text-lg mb-1">${news.title}</h4>
      <p class="text-sm">${news.content}</p>
      <p class="text-xs text-gray-600 mt-1">${news.date}</p>
    `;
    container.appendChild(div);
  });
}

// ================================
// 4️⃣ Avvio del caricamento dati
// ================================
loadBlogPosts();
loadDailyNews();
