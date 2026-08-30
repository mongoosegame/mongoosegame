document.addEventListener('DOMContentLoaded', () => {
    const play12Btn = document.getElementById('play-1.2-tab');
    const play13Btn = document.getElementById('play-1.3-tab');
    const play12Wrapper = document.getElementById('play-1.2-wrapper');
    const play13Wrapper = document.getElementById('play-1.3-wrapper');

    const iframe12 = play12Wrapper?.querySelector('iframe');
    const iframe13 = play13Wrapper?.querySelector('iframe');

    function switchTab(activeBtn, inactiveBtn, activeWrapper, inactiveWrapper, activeIframe, inactiveIframe) {
        activeBtn.classList.add('active-tab');
        inactiveBtn.classList.remove('active-tab');
        activeWrapper.style.display = 'block';
        inactiveWrapper.style.display = 'none';

        if (inactiveIframe) {
            inactiveIframe.src = '';
        }

        if (activeIframe && activeIframe.src !== activeIframe.dataset.src) {
            activeIframe.src = activeIframe.dataset.src;
        }
    }

    if (play12Btn && play13Btn) {
        play12Btn.addEventListener('click', () => {
            switchTab(play12Btn, play13Btn, play12Wrapper, play13Wrapper, iframe12, iframe13);
        });

        play13Btn.addEventListener('click', () => {
            switchTab(play13Btn, play12Btn, play13Wrapper, play12Wrapper, iframe13, iframe12);
        });
    }
});