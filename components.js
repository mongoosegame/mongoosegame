
function loadHeader() {
    setFavicon();
    const headerHTML = `
    <div class="top-banner" id="announcement">
        <img src="resources/img/gameicon.webp" alt="Game Icon">
        <p>Check out the updated <a href="assets.html">OST & Assets</a> page!</p>
        <button class="close-banner" onclick="dismissBanner()">X</button>
    </div>
    <div class="navbar comic-sans">
        <div class="left">
            <a href="index.html" class="enabled" id="link-index">Home</a>
            <a href="speedruns.html" class="enabled" id="link-speedruns">Speedruns</a>
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

    initTheme();
}

function setFavicon() {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = 'resources/img/gameicon.webp';
}

function initTheme() {
    const saved = localStorage.getItem('theme') || 'default';
    applyTheme(saved, false);

    const container = document.querySelector('.container');
    const firstH1 = container && container.querySelector('h1');
    if (firstH1) {
        const placeholder = document.createElement('div');
        placeholder.id = 'theme-toggle-placeholder';
        placeholder.innerHTML = `
            <select id="theme-select" class="theme-select comic-sans" aria-label="Change theme" onchange="applyTheme(this.value, true)">
                <option value="default">Regular Theme</option>
                <option value="matrix">Matrix and Mastery Launch Theme</option>
                <option value="mongoose_1">Style and Selection Launch Theme (Mongoose)</option>
                <option value="mongoose_2">Style and Selection Launch Theme (John Mop)</option>
                <option value="mongoose_3">Style and Selection Launch Theme (Jane)</option>
                <option value="level_1">Mongooseland (Level 1) Theme</option>
            </select>
        `;
        container.insertBefore(placeholder, firstH1);
        document.getElementById('theme-select').value = saved;
    }
}

function applyTheme(theme, save) {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) localStorage.setItem('theme', theme);
    const select = document.getElementById('theme-select');
    if (select) select.value = theme;
}

function dismissBanner() {
    const banner = document.getElementById('announcement');
    const messageText = banner ? banner.querySelector('p').innerText : '';
    if (banner) banner.style.display = 'none';
    localStorage.setItem('lastBannerMessage', messageText);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadHeader();
        loadFooter();
    });
} else {
    loadHeader();
    loadFooter();
}

function loadFooter() {
    if (document.getElementById('site-footer')) return;
    const footer = document.createElement('footer');
    footer.id = 'site-footer';
    footer.innerHTML = `
        <p>For your feedback and fan-mail:</p>
        <h3 id="email">awesomemongoosegame@gmail.com</h3>
        <a href="meettheteam.html">Page: Meet the team!</a>
    `;
    document.body.appendChild(footer);
}