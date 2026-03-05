(() => {
    let v = document.querySelector('video');
    if (v) {
        v.controls = !v.controls;
    } else {
        alert('لم يتم العثور على فيديو في هذه الصفحة.');
    }
})();