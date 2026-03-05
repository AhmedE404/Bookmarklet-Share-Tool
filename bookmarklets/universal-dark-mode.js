(() => {
    const existing = document.getElementById('__night_mode_css');
    if (existing) {
        existing.remove();
    } else {
        const css = `
            * { background-color: #111 !important; color: #eee !important; border-color: #444 !important; }
            a { color: #4da6ff !important; }
            img, video { opacity: 0.8 !important; }
            ::selection { background: #555; color: white; }
        `;
        const style = document.createElement('style');
        style.id = '__night_mode_css';
        style.innerHTML = css;
        document.head.appendChild(style);
    }
})();