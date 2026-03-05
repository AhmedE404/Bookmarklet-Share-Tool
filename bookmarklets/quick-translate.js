(() => {
    let selTxt = window.getSelection().toString().trim();
    if (selTxt) {
        window.open(`https://translate.google.com/?sl=auto&tl=ar&text=${encodeURIComponent(selTxt)}&op=translate`, '_blank');
    } else {
        alert('حدد نصًا أولاً للترجمة');
    }
})();