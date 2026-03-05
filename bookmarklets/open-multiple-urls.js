(() => {
    let input = prompt('أدخل الروابط مفصولة بمسافة (Space):');
    if (input) {
        let urls = input.split(/\s+/);
        urls.forEach(url => {
            if (url) window.open(url, '_blank');
        });
    }
})();