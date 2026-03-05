(() => {
    let count = 0;
    document.querySelectorAll('*').forEach(el => {
        let style = window.getComputedStyle(el);
        if (style.position === 'fixed' || style.position === 'sticky') {
            el.style.position = 'static';
            count++;
        }
    });
    // عرض رسالة صغيرة بدون إزعاج
    if (count > 0) console.log(`تم تحرير ${count} عنصر ثابت.`);
})();