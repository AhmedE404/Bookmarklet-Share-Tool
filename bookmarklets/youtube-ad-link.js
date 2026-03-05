(() => {
    let artworkSrc = window.navigator.mediaSession.metadata?.artwork[0]?.src;
    if (artworkSrc) {
        let videoId = artworkSrc.pathname.match(/\/vi\/([^/]{11})/)[1];
        open(prompt('هذا رابط الفديو المعروض حاليا هل تريد فتحه؟', 'https://youtu.be/' + videoId));
    } else {
        alert('لا يمكن العثور على بيانات الفيديو الحالي.');
    }
})();