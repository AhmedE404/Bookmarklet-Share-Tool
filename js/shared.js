// --- 1. Toast Notification ---
window.showToast = function (message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
};

// --- 2. Compression Utilities ---
window.bytesToBase64Url = function (bytes) {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

window.base64UrlToBytes = function (base64Url) {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
};

window.compressData = async function (dataObj) {
    const stream = new Response(JSON.stringify(dataObj)).body.pipeThrough(new CompressionStream('deflate-raw'));
    return bytesToBase64Url(new Uint8Array(await new Response(stream).arrayBuffer()));
};

window.decompressData = async function (base64Url) {
    const bytes = base64UrlToBytes(base64Url);
    const stream = new Response(bytes).body.pipeThrough(new DecompressionStream('deflate-raw'));
    return JSON.parse(new TextDecoder().decode(await new Response(stream).arrayBuffer()));
};

// --- 3. Internationalization (i18n) ---
window.currentLang = localStorage.getItem('lang') || 'en';
window.translations = {};

window.initI18n = async function (basePath = '') {
    const supportedLangs = { 'en': 'English', 'ar': 'العربية' };
    const langSelect = document.getElementById('langSelect');

    if (langSelect && langSelect.options.length === 0) {
        Object.entries(supportedLangs).forEach(([code, name]) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = name;
            if (code === window.currentLang) option.selected = true;
            langSelect.appendChild(option);
        });

        langSelect.addEventListener('change', (e) => {
            window.currentLang = e.target.value;
            localStorage.setItem('lang', window.currentLang);
            window.loadLanguage(basePath);
        });
    }
    await window.loadLanguage(basePath);
};

window.loadLanguage = async function (basePath = '') {
    try {
        const response = await fetch(`${basePath}locales/${window.currentLang}.json`);
        window.translations = await response.json();

        document.documentElement.lang = window.currentLang;
        const rtlLangs = ['ar', 'fa', 'he', 'ur'];
        document.documentElement.dir = rtlLangs.includes(window.currentLang) ? 'rtl' : 'ltr';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (window.translations[key]) el.innerHTML = window.translations[key];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (window.translations[key]) el.placeholder = window.translations[key];
        });

        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.userAgent.includes("Mac");
        if (isMac) {
            if (document.getElementById('ctrlKey')) document.getElementById('ctrlKey').innerText = '⌘';
            if (document.getElementById('ctrlKeyInstall')) document.getElementById('ctrlKeyInstall').innerText = '⌘';
        }

        // إطلاق حدث عام لإخبار باقي الملفات أن الترجمة جاهزة
        window.dispatchEvent(new Event('i18nReady'));
    } catch (error) {
        console.error("Error loading language file:", error);
    }
};

// --- 4. Drag Overlay Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const dragOverlay = document.getElementById('dragOverlay');
    if (!dragOverlay) return;

    document.addEventListener('dragstart', (e) => {
        if (e.target.classList && (e.target.classList.contains('btn-drag-sm') || e.target.classList.contains('btn-drag-large'))) {
            dragOverlay.classList.add('active');
        }
    });

    document.addEventListener('dragend', (e) => {
        if (e.target.classList && (e.target.classList.contains('btn-drag-sm') || e.target.classList.contains('btn-drag-large'))) {
            dragOverlay.classList.remove('active');
        }
    });
});