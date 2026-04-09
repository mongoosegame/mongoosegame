
function loadHeader() {
    setFavicon();
    const headerHTML = `
    <div class="top-banner" id="announcement">
        <img src="resources/img/gameicon.jpg" alt="Game Icon">
        <p>Update 1.1 just released!</p>
        <button class="close-banner" onclick="dismissBanner()">X</button>
    </div>
    <div class="navbar comic-sans">
        <div class="left">
            <a href="index.html" class="enabled" id="link-index">Home</a>
            <a id="link-speedruns">Speedruns (WIP)</a>
            <a href="assets.html" class="enabled" id="link-assets">OST &amp; Assets</a>
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
    link.href = 'resources/img/gameicon.jpg';
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
            <button id="theme-toggle-btn" class="theme-toggle-btn comic-sans" aria-label="Toggle theme" onclick="toggleTheme()">
                <span class="theme-toggle-icon"></span>
                <span class="theme-toggle-label"></span>
            </button>
        `;
        container.insertBefore(placeholder, firstH1);
        updateToggleBtn(saved);
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'default';
    const next = current === 'default' ? 'matrix' : 'default';
    applyTheme(next, true);
}

function applyTheme(theme, save) {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) localStorage.setItem('theme', theme);
    updateToggleBtn(theme);
}

function updateToggleBtn(theme) {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    const label = btn.querySelector('.theme-toggle-label');
    if (theme === 'matrix') {
        label.textContent = 'Switch to regular theme';
        btn.setAttribute('data-current-theme', 'matrix');
    } else {
        label.textContent = 'Switch to Matrix and Mastery launch theme';
        btn.setAttribute('data-current-theme', 'default');
    }
}

function dismissBanner() {
    const banner = document.getElementById('announcement');
    const messageText = banner ? banner.querySelector('p').innerText : '';
    if (banner) banner.style.display = 'none';
    localStorage.setItem('lastBannerMessage', messageText);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}
