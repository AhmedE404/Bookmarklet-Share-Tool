(() => {
    let tables = document.querySelectorAll('table');
    if (!tables.length) return alert('لم يتم العثور على أي جداول في هذه الصفحة.');

    // هنسحب أول جدول يقابلنا في الصفحة
    let csv = [];
    tables[0].querySelectorAll('tr').forEach(tr => {
        let row = [];
        tr.querySelectorAll('td, th').forEach(td => {
            // تنظيف النص وتجهيزه لصيغة الإكسيل
            let data = td.innerText.replace(/"/g, '""');
            row.push('"' + data + '"');
        });
        csv.push(row.join(','));
    });

    navigator.clipboard.writeText(csv.join('\n')).then(() => {
        alert('تم سحب أول جدول ونسخه كـ CSV! افتح Excel واضغط Paste.');
    }).catch(e => alert('فشل النسخ: ' + e));
})();