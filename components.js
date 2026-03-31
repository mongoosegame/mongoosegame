
function loadHeader() {
    const headerHTML = `
    <div class="top-banner" id="announcement">
        <img src="resources/img/gameicon.jpg" alt="Game Icon">


        <p>
        Update 1.1 just released!
        </p>


        <button class="close-banner" onclick="dismissBanner()">X</button>
    </div>

    <div class="navbar comic-sans">
        <div class="left">
            <a href="index.html" class="enabled" id="link-index">Home</a>
            <a id="link-speedruns">Speedruns (WIP)</a>
            <a href="assets.html" class="enabled" id="link-assets">OST & Assets</a>
            <a href="news.html" class="enabled" id="link-news">News</a>
        </div>
        <div class="right">
            <a href="play.html" id="link-play" class="play papyrus enabled">Play</a>
        </div>
    </div>
    `;

    const headerContainer = document.getElementById('header-placeholder');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
    }

    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";

    const linkMap = {
        "index.html": "link-index",
        "speedruns.html": "link-speedruns",
        "assets.html": "link-assets",
        "news.html": "link-news",
        "play.html": "link-play"
    };

    const currentLinkId = linkMap[page];
    if (currentLinkId) {
        document.getElementById(currentLinkId).classList.add('activelink');
    }

    const banner = document.getElementById('announcement');
    const messageText = banner ? banner.querySelector('p').innerText : '';
    const savedMessage = localStorage.getItem('lastBannerMessage');

    if (savedMessage === messageText) {
        if (banner) banner.style.display = 'none';
    }
}

function dismissBanner() {
    const banner = document.getElementById('announcement');
    const messageText = banner ? banner.querySelector('p').innerText : '';

    if (banner) banner.style.display = 'none';
    localStorage.setItem('lastBannerMessage', messageText);
}

loadHeader();
