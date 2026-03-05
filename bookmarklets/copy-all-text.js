(() => {
    navigator.clipboard.writeText(document.body.innerText)
        .then(() => alert('تم نسخ نصوص الصفحة بنجاح!'))
        .catch(err => alert('فشل النسخ: ' + err));
})();