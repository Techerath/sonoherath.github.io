// ==== Supabase Setup ====
const supabaseUrl = 'https://afiayjdmoorsmsrlslks.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaWF5amRtb29yc21zcmxzbGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMzg1NzIsImV4cCI6MjA3MDkxNDU3Mn0.ULv1VVohSZozvi-ardEjpTfjrkzYsO4Pi2FbuUCPZrk';     
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ==== Traduzione Lingue ====
const translations = {
  en: { "milestones": "Aviation Milestones", "news": "Latest News", "tech": "New Technologies", "world": "Aviation World News", "events": "Events & Fairs", "site-title": "Flights with Herath" },
  it: { "milestones": "Pietre miliari dell’aviazione", "news": "Ultime Notizie", "tech": "Nuove Tecnologie", "world": "Ultime Notizie nel Mondo dell’Aviazione", "events": "Eventi e Fiere", "site-title": "Voli con Herath" },
  zh: { "milestones": "航空里程碑", "news": "最新消息", "tech": "新技术", "world": "全球航空新闻", "events": "活动与展会", "site-title": "与Herath飞行" },
  ja: { "milestones": "航空のマイルストーン", "news": "最新ニュース", "tech": "新技術", "world": "航空界のニュース", "events": "イベントと展示会", "site-title": "Herathと飛ぶ" },
  ko: { "milestones": "항공 이정표", "news": "최신 소식", "tech": "신기술", "world": "항공 세계 뉴스", "events": "이벤트 및 박람회", "site-title": "Herath와 함께 비행" },
  no: { "milestones": "Luftfartens milepæler", "news": "Siste nytt", "tech": "Ny teknologi", "world": "Nyheter fra luftfarten", "events": "Arrangementer og messer", "site-title": "Flyvninger med Herath" },
  ar: { "milestones": "معالم الطيران", "news": "آخر الأخبار", "tech": "تقنيات جديدة", "world": "أخبار عالم الطيران", "events": "الفعاليات والمعارض", "site-title": "رحلات مع Herath" },
  ta: { "milestones": "விமானக் கற்கைகள்", "news": "சமீபத்திய செய்திகள்", "tech": "புதிய தொழில்நுட்பங்கள்", "world": "விமான உலக செய்திகள்", "events": "நிகழ்வுகள் மற்றும் கண்காட்சிகள்", "site-title": "Herath உடன் விமானங்கள்" }
};

document.getElementById("language-selector").addEventListener("change", function() {
  const lang = this.value;
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  if (translations[lang]["site-title"]) {
    document.getElementById("site-title").textContent = translations[lang]["site-title"];
  }
});

// ==== Pulsante Torna su ====
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 200 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==== Newsletter con Supabase ====
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMsg = document.getElementById('newsletter-msg');

if (newsletterForm) { // Controllo se il form esiste
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    const { data, error } = await supabase
      .from('newsletter')
      .insert([{ email }]);

    if (error) {
      newsletterMsg.textContent = "Errore durante l'iscrizione.";
      newsletterMsg.style.color = 'red';
    } else {
      newsletterMsg.textContent = "Grazie per esserti iscritto!";
      newsletterMsg.style.color = 'green';
      newsletterForm.reset();
    }
  });
}
