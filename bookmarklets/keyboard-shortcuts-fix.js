(() => {
    ((p, k, O, g, a) => {
        g = O.getOwnPropertyDescriptor(p, k).get;
        O.defineProperty(p, k, {
            get: function () {
                return /T|A/.test((a = document.activeElement).tagName) || a.isContentEditable || this.code[0] != 'K'
                    ? g.call(this)
                    : this.code.charCodeAt(3);
            },
            configurable: !0
        });
    })(KeyboardEvent.prototype, 'keyCode', Object);
    alert('تم تفعيل إصلاح اختصارات لوحة المفاتيح.');
})();