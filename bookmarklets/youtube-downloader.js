(() => {
    let q = prompt('اختر رقم الجودة:\n1=144p\n2=240p\n3=360p\n4=480p\n5=720p\n6=1080p\n(يجب تعديل User-Agent إلى Safari Mac قبل التشغيل)', 3);
    if (q) {
        fetch('/watch?v=' + new URL(location.href).searchParams.get('v'))
            .then(r => r.text())
            .then(t => JSON.parse(t.match(/ytInitialPlayerResponse\s*=\s*(\{.*?\});/s)[1]).streamingData.hlsManifestUrl)
            .then(u => fetch(u).then(r => r.text()))
            .then(t => {
                let a = t.split('\n').filter(l => l && l[0] != '#' && l.includes('.m3u8'));
                return a[((q.charCodeAt(0) & 15) - 1) % a.length];
            })
            .then(m => fetch(m).then(r => r.text()))
            .then(t => Promise.all(t.split('\n').filter(l => l && l[0] != '#').map(u => fetch(u).then(r => r.blob()))))
            .then(b => {
                let a = document.createElement('a');
                a.href = URL.createObjectURL(new Blob(b, { type: 'video/mp2t' }));
                a.download = movie_player.getVideoData().title + '.ts';
                a.click();
            }).catch(e => alert('يرجى إعادة المحاولة'));
    }
})();