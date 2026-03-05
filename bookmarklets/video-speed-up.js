(() => {
    let v = document.querySelector('video[src]');
    if (v) {
        // يمكنك تعديل الرقم 3 لأي سرعة تريدها
        v.playbackRate = 3;
    } else {
        alert('لم يتم العثور على فيديو في هذه الصفحة.');
    }
})();