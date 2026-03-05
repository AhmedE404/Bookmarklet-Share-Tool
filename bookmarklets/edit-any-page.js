(() => {
    if (document.designMode === 'on') {
        document.designMode = 'off';
        document.body.contentEditable = 'false';
        alert('❌ تم إيقاف وضع التعديل.');
    } else {
        document.designMode = 'on';
        document.body.contentEditable = 'true';
        alert('✅ وضع التعديل مفعل! يمكنك الآن مسح أو كتابة أي شيء في الصفحة.');
    }
})();