class CategoryTracker {
    constructor(listSelector, navContainerId, spanId) {
        this.list = document.querySelector(listSelector);
        if (!this.list) return;

        this.categories = Array.from(this.list.querySelectorAll('h2'));
        this.currentIndex = 0;
        this.span = document.getElementById(spanId);
        this.navContainer = document.getElementById(navContainerId);

        if (this.categories.length === 0 || !this.span || !this.navContainer) return;

        const observer = new IntersectionObserver((entries) => {
            let visibleCategories = entries.filter(e => e.isIntersecting);
            if (visibleCategories.length > 0) {
                const target = visibleCategories[0].target;
                const idx = this.categories.indexOf(target);
                if (idx !== -1) {
                    this.currentIndex = idx;
                    this.updateNav();
                }
            }
        }, { rootMargin: '-15% 0px -70% 0px' });

        this.categories.forEach(h2 => observer.observe(h2));
        this.updateNav();

        const prevBtn = this.navContainer.querySelector('.prev-btn');
        const nextBtn = this.navContainer.querySelector('.next-btn');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prevCategory());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextCategory());
    }

    updateNav() {
        if (this.span && this.categories[this.currentIndex]) {
            this.span.innerText = this.categories[this.currentIndex].innerText;
        }
    }

    prevCategory() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.scrollToCategory();
        }
    }

    nextCategory() {
        if (this.currentIndex < this.categories.length - 1) {
            this.currentIndex++;
            this.scrollToCategory();
        }
    }

    scrollToCategory() {
        const isMobile = window.innerWidth <= 900;
        const offset = isMobile ? 80 : 150;
        const y = this.categories[this.currentIndex].getBoundingClientRect().top + window.scrollY - offset;

        const duration = 250; // millisceonds
        const startY = window.scrollY;
        const diff = y - startY;
        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const time = timestamp - start;
            let percent = Math.min(time / duration, 1);
            percent = percent * (2 - percent);
            window.scrollTo(0, startY + diff * percent);
            if (time < duration) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

function initImageZoom() {
    document.querySelectorAll('.img-responsive').forEach(img => {
        if (img.parentElement.classList.contains('img-zoom-wrapper')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'img-zoom-wrapper';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        function updateZoomOrigin(clientX, clientY) {
            const rect = wrapper.getBoundingClientRect();
            let x = ((clientX - rect.left) / rect.width) * 100;
            let y = ((clientY - rect.top) / rect.height) * 100;

            x = Math.max(0, Math.min(100, x));
            y = Math.max(0, Math.min(100, y));

            img.style.transformOrigin = `${x}% ${y}%`;
        }

        wrapper.addEventListener('mousemove', e => {
            updateZoomOrigin(e.clientX, e.clientY);
        });

        wrapper.addEventListener('touchmove', e => {
            e.preventDefault();
            const touch = e.touches[0];
            updateZoomOrigin(touch.clientX, touch.clientY);
        }, { passive: false });
    });
}

function switchTab(tab) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    const view = document.getElementById('view-' + tab);
    const tabBtn = document.getElementById('tab-' + tab);

    if (view) view.classList.add('active');
    if (tabBtn) tabBtn.classList.add('active');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runScripts);
} else {
    runScripts();
}

function runScripts() {
    initImageZoom();

    new CategoryTracker('.asset-list', 'category-nav-assets', 'current-category-assets');
    new CategoryTracker('.ost-list', 'category-nav-ost', 'current-category-ost');
}