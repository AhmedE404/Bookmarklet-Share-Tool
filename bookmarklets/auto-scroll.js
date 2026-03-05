(() => {
    if (window.__scrollInterval) {
        clearInterval(window.__scrollInterval);
        window.__scrollInterval = null;
    } else {
        // يمكنك تعديل رقم 100 لتغيير سرعة التمرير
        window.__scrollInterval = setInterval(() => {
            window.scrollBy({ top: window.innerHeight / 100, behavior: 'smooth' });
        }, 50);
    }
})();