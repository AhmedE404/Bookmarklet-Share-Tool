(() => {
    try {
        let match = window.location.href.match(/(v=|shorts\/|vi\/|v\/|e\/|embed\/|watch\?.*v=)([\w-]{11})/);
        if (match && match[2]) {
            window.open(`https://i.ytimg.com/vi/${match[2]}/maxresdefault.jpg`, '_blank');
        } else {
            alert('لم يتم العثور على فيديو يوتيوب في هذا الرابط.');
        }
    } catch (e) {
        console.error(e);
    }
})();