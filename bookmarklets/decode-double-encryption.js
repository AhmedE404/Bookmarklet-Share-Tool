(() => {
    try {
        let input = prompt("اكتب الرابط أو النص ذو التشفير المزدوج:");
        if (input) {
            let decoded = atob(decodeURIComponent(input));
            prompt("فك التشفير:", decoded);
        }
    } catch (e) {
        alert("حدث خطأ أثناء فك التشفير. تأكد من أن النص مشفر بشكل صحيح.");
    }
})();