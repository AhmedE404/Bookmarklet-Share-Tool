(() => {
    window.cmb || (cmb = 1,
        (d => {
            d.head.appendChild(d.createElement('style')).textContent = '.ytp-skip-ad-button,.ytp-ad-skip-button-modern{display:flex!important;}';
            d.onkeydown = e => {
                if (e.key !== 'Enter') return;
                if (d.querySelector('.ad-showing')) {
                    (s => (s ? s.focus() : (v => { e.preventDefault(); v.currentTime = v.duration - 0.1; v.play(); })(d.querySelector('video[src]'))))(d.querySelector('.ytp-skip-ad-button,.ytp-ad-skip-button-modern'));
                }
            };
        })(document),
        addEventListener('yt-navigate-finish', async () => {
            document.querySelector('#shorts-player')?.setPlaybackRate(movie_player.getPlaybackRate());
            {
                let k = document.getElementById('kyw');
                if (!k) {
                    k = document.createElement('div');
                    k.id = 'kyw';
                    k.style.cssText = 'font-size:16px;margin-top:8px;';
                    let t = document.querySelector('#above-the-fold #title');
                    if (t) t.parentElement.insertBefore(k, t.nextSibling);
                }
                fetch('/watch?v=' + movie_player.getVideoData().video_id).then(r => r.text()).then(b => {
                    let match = b.match(/ytInitialPlayerResponse\s*=\s*(\{.*?\});/s);
                    k.textContent = (match && JSON.parse(match[1]).videoDetails?.keywords?.join(' / ')) || 'لا يوجد كلمات مفتاحية';
                });
            }
            fetch('https://returnyoutubedislikeapi.com/votes?videoId=' + new URL(location).searchParams.get('v')).then(r => r.json()).then(j => {
                let n = j.dislikes;
                let b = document.querySelector('segmented-like-dislike-button-view-model')?.querySelectorAll('button')[1];
                if (b) {
                    setTimeout(() => {
                        let t = b.querySelector('#text');
                        if (!t) {
                            t = document.createElement('span');
                            t.id = 'text';
                            b.appendChild(t);
                            b.style.width = 'auto';
                        }
                        t.textContent = Intl.NumberFormat(...(window?.yt?.config_?.HL ? [yt.config_.HL, { notation: 'compact' }] : [])).format(n);
                    }, 200);
                }
            });
        }));
    movie_player.setPlaybackRate(movie_player.getPlaybackRate() === 1 ? 2 : 1);
    dispatchEvent(new Event('yt-navigate-finish'));
})();