(() => {
    let v = document.querySelector('video');
    if (v && v.requestPictureInPicture) {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        } else {
            v.requestPictureInPicture();
        }
    } else {
        alert('لا يوجد فيديو هنا أو متصفحك لا يدعم هذه الميزة.');
    }
})();