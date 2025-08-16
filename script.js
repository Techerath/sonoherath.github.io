// Carica Notizie da RSS Feed
async function loadNews() {
    const rssUrls = [
        "https://www.ansa.it/sito/notizie/mondo/mondo_rss.xml",
        "https://xml2.corriereobjects.it/rss/esteri.xml"
    ];

    let newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    for (let url of rssUrls) {
        let res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        let data = await res.json();
        let parser = new DOMParser();
        let xml = parser.parseFromString(data.contents, "text/xml");
        let items = xml.querySelectorAll("item");

        items.forEach((item, index) => {
            if (index < 3) {
                let title = item.querySelector("title").textContent;
                let link = item.querySelector("link").textContent;
                let description = item.querySelector("description").textContent;

                let card = document.createElement("div");
                card.className = "card bg-white p-4 rounded shadow";
                card.setAttribute("data-aos", "fade-up");
                card.innerHTML = `
                    <h3 class="font-bold text-lg mb-2">${title}</h3>
                    <p class="text-sm mb-4">${description}</p>
                    <a href="${link}" target="_blank" class="text-blue-600 font-bold hover:underline">Leggi di più</a>
                `;
                newsContainer.appendChild(card);
            }
        });
    }
}

// Carica Video YouTube
async function loadVideos() {
    const query = "aviazione news";
    const API_KEY = "YOUR_YOUTUBE_API_KEY";
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=6&key=${API_KEY}`);
    const data = await res.json();

    let videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";

    data.items.forEach(video => {
        let videoCard = document.createElement("div");
        videoCard.className = "card bg-white p-4 rounded shadow";
        videoCard.setAttribute("data-aos", "fade-up");
        videoCard.innerHTML = `
            <iframe width="100%" height="200" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
            <h3 class="font-bold text-lg mt-2">${video.snippet.title}</h3>
        `;
        videoContainer.appendChild(videoCard);
    });
}

loadNews();
loadVideos();
