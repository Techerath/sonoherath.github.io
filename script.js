// --- Navbar sticky style on scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// --- Mobile menu toggle ---
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// --- Sezioni: imposta sfondi dinamici da data-bg e rivela con animazione quando entrano in viewport ---
const sections = document.querySelectorAll('.section');
sections.forEach(sec => {
  const bg = sec.getAttribute('data-bg');
  if (bg) sec.style.backgroundImage = `url('${bg}')`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('revealed');
  });
}, { threshold: 0.15 });

sections.forEach(s => observer.observe(s));

// --- Smooth scroll + mini-animazione all'arrivo ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    e.preventDefault();
    const target = document.querySelector(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Aggiunge effetto rivelazione se non già presente
    target.classList.add('revealed');
    // Chiude il menu mobile dopo il click
    mobileMenu?.classList.remove('open');
  });
});

// --- NEWS via RSS (usa proxy allorigins per CORS) ---
async function loadNews() {
  const rssUrls = [
    'https://www.ansa.it/sito/notizie/mondo/mondo_rss.xml',
    'https://xml2.corriereobjects.it/rss/esteri.xml'
  ];

  const newsContainer = document.getElementById('news-container');
  const errorEl = document.getElementById('news-error');
  newsContainer.innerHTML = '';
  errorEl.classList.add('hidden');

  try {
    for (const url of rssUrls) {
      const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, 'text/xml');
      const items = Array.from(xml.querySelectorAll('item')).slice(0, 3);

      items.forEach(item => {
        const title = item.querySelector('title')?.textContent || 'Senza titolo';
        const link = item.querySelector('link')?.textContent || '#';
        const description = item.querySelector('description')?.textContent || '';

        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-animate', '');
        card.innerHTML = `
          <h3 class="card-title">${title}</h3>
          <p class="text-sm text-gray-700 mb-4">${description}</p>
          <a class="text-blue-700 font-semibold hover:underline" href="${link}" target="_blank" rel="noopener">Leggi di più</a>
        `;
        newsContainer.appendChild(card);
      });
    }
  } catch (err) {
    console.error('Errore RSS:', err);
    errorEl.classList.remove('hidden');
  }
}

// --- Video YouTube (opzionale) ---
async function loadVideos() {
  const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // <-- Inserisci la tua API key qui
  const query = 'aviazione tecnologia';
  const container = document.getElementById('video-container');
  const errorEl = document.getElementById('video-error');
  container.innerHTML = '';
  errorEl.classList.add('hidden');

  if (!API_KEY || API_KEY === 'YOUR_YOUTUBE_API_KEY') {
    errorEl.classList.remove('hidden');
    return;
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=6&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    (data.items || []).forEach(v => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-animate', '');
      card.innerHTML = `
        <div class="rounded-lg overflow-hidden mb-3">
          <iframe width="100%" height="200" src="https://www.youtube.com/embed/${v.id.videoId}" title="${v.snippet.title}" frameborder="0" allowfullscreen></iframe>
        </div>
        <h3 class="card-title">${v.snippet.title}</h3>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Errore YouTube:', err);
    errorEl.classList.remove('hidden');
  }
}

// Init caricamenti quando il DOM è pronto
window.addEventListener('DOMContentLoaded', () => {
  loadNews();
  loadVideos();
});