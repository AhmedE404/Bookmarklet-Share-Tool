(() => {
    const a = Object.entries(window.ytcsi?.debug || {}).map(e => e[1]?.info?.adVideoId).filter(i => i && i !== 'empty_video');
    const t = a.map(i => 'https://youtu.be/' + i).join('\n');
    const l = a.at(-1);
    if (!a.length) return alert('🚫 لا يوجد إعلانات.');
    if (prompt('📺 عدد الإعلانات: ' + a.length, t)) {
        open('https://youtu.be/' + l);
    }
})();