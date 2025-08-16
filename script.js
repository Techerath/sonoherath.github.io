// ==== Supabase Setup ====
const supabaseUrl = 'https://afiayjdmoorsmsrlslks.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaWF5amRtb29yc21zcmxzbGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMzg1NzIsImV4cCI6MjA3MDkxNDU3Mn0.ULv1VVohSZozvi-ardEjpTfjrkzYsO4Pi2FbuUCPZrk';     
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ==== Funzione per mostrare Blog Posts ====
async function loadBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')   // nome della tua tabella blog
    .select('*')
    .order('created_at', { ascending: false });

  const container = document.getElementById('blog-container');
  container.innerHTML = '';

  if (error) {
    container.innerHTML = `<p class="text-red-500">Errore nel caricamento dei blog: ${error.message}</p>`;
    return;
  }

  data.forEach(post => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded-lg shadow hover:shadow-lg transition';
    card.innerHTML = `
      <h3 class="font-bold text-lg mb-2">${post.title}</h3>
      <p class="text-gray-700">${post.content}</p>
      <p class="text-sm text-gray-400 mt-2">${new Date(post.created_at).toLocaleDateString()}</p>
    `;
    container.appendChild(card);
  });
}

// ==== Funzione per mostrare Daily News ====
async function loadDailyNews() {
  const { data, error } = await supabase
    .from('daily_news')   // nome della tua tabella news
    .select('*')
    .order('created_at', { ascending: false });

  const container = document.getElementById('news-container');
  container.innerHTML = '';

  if (error) {
    document.getElementById('news-error').classList.remove('hidden');
    return;
  }

  data.forEach(news => {
    const card = document.createElement('div');
    card.className = 'bg-white bg-opacity-90 p-4 rounded-lg shadow text-gray-800';
    card.innerHTML = `
      <h3 class="font-bold text-lg mb-2">${news.title}</h3>
      <p class="text-gray-700">${news.content}</p>
      <p class="text-sm text-gray-400 mt-2">${new Date(news.created_at).toLocaleDateString()}</p>
    `;
    container.appendChild(card);
  });
}

// ==== Funzione per mostrare About Me ====
async function loadAboutMe() {
  const { data, error } = await supabase
    .from('about_me')  // nome della tua tabella about_me
    .select('*');

  if (error || !data.length) return;

  const cards = document.querySelectorAll('#about .card');
  cards[0].querySelector('p').innerText = data[0].formazione;
  cards[1].querySelector('p').innerText = data[0].obiettivo;
  cards[2].querySelector('p').innerText = data[0].contatti;
}

// ==== Inizializzazione ====
document.addEventListener('DOMContentLoaded', () => {
  loadBlogPosts();
  loadDailyNews();
  loadAboutMe();
});
