// ==== Supabase Setup ====
const supabaseUrl = 'https://afiayjdmoorsmsrlslks.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaWF5amRtb29yc21zcmxzbGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMzg1NzIsImV4cCI6MjA3MDkxNDU3Mn0.ULv1VVohSZozvi-ardEjpTfjrkzYsO4Pi2FbuUCPZrk';     
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
// --- Funzione per caricare dati da una tabella ---
async function loadTable(tableName, containerId) {
  const { data, error } = await supabase.from(tableName).select('*');
  const container = document.getElementById(containerId);
  if (error) {
    console.error(`Errore caricamento ${tableName}:`, error);
    if(container) container.innerHTML = `<p class="text-red-500">Impossibile caricare ${tableName}</p>`;
    return;
  }

  if (!container) return;

  container.innerHTML = ''; // Pulisce il container prima di aggiungere elementi
  data.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card bg-white bg-opacity-90 rounded-xl shadow p-4 text-gray-900';
    
    // Aggiungiamo AOS animation
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', `${index * 100}`); // ritardo progressivo per effetto a cascata
    card.setAttribute('data-aos-duration', '800');

    let content = '';
    switch(tableName) {
      case 'blog_post':
        content = `<h3 class="font-bold mb-2">${item.title}</h3>
                   <p>${item.content}</p>`;
        break;
      case 'daily_news':
        content = `<h3 class="font-bold mb-2">${item.title}</h3>
                   <p>${item.summary}</p>
                   <a href="${item.link}" target="_blank" class="text-blue-600">Leggi</a>`;
        break;
      case 'archive':
        content = `<h3 class="font-bold mb-2">${item.incident_name}</h3>
                   <p>${item.date}</p>
                   <p>${item.details}</p>`;
        break;
      case 'history':
        content = `<h3 class="font-bold mb-2">${item.event}</h3>
                   <p>${item.year}</p>
                   <p>${item.description}</p>`;
        break;
      case 'simulators':
        content = `<h3 class="font-bold mb-2">${item.name}</h3>
                   <p>${item.platform}</p>
                   <a href="${item.link}" target="_blank" class="text-blue-600">Vai al gioco</a>`;
        break;
      default:
        content = JSON.stringify(item);
    }
    card.innerHTML = content;
    container.appendChild(card);
  });

  // Rinfresca AOS per applicare animazioni ai nuovi elementi
  AOS.refresh();
}

// --- Caricamento dati al load della pagina ---
document.addEventListener('DOMContentLoaded', () => {
  loadTable('blog_post', 'blog-container');
  loadTable('daily_news', 'news-container');
  loadTable('archive', 'archive-container');
  loadTable('history', 'history-container');
  loadTable('simulators', 'simulators-container');
});
