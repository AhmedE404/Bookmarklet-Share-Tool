// 1. إعدادات الماك
const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.userAgent.includes("Mac");
if (isMac) document.getElementById('ctrlKey').innerText = '⌘';

// 2. دوال الضغط وفك الضغط
function bytesToBase64Url(bytes) {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBytes(base64Url) {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

async function compressData(dataObj) {
    const stream = new Response(JSON.stringify(dataObj)).body.pipeThrough(new CompressionStream('deflate-raw'));
    return bytesToBase64Url(new Uint8Array(await new Response(stream).arrayBuffer()));
}

async function decompressData(base64Url) {
    const bytes = base64UrlToBytes(base64Url);
    const stream = new Response(bytes).body.pipeThrough(new DecompressionStream('deflate-raw'));
    return JSON.parse(new TextDecoder().decode(await new Response(stream).arrayBuffer()));
}

// 3. دالة التحكم في الواجهة (بتشتغل أول مرة، ولما الرابط يتغير)
async function renderView() {
    const hash = window.location.hash.substring(1);
    const installMode = document.getElementById('installMode');
    const createMode = document.getElementById('createMode');

    if (hash) {
        try {
            const data = await decompressData(hash);
            const btn = document.getElementById('toolBtn');

            btn.innerHTML = data.name.trim() || "اسحب هذا لشريط المفضلة";

            let safeCode = data.code.trim();
            if (safeCode.startsWith('javascript:')) safeCode = safeCode.replace('javascript:', '');
            btn.href = 'javascript:' + encodeURIComponent(safeCode);

            // إخفاء الإنشاء وإظهار التثبيت
            createMode.style.display = 'none';
            installMode.style.display = 'block';

            // تعبئة البيانات في الفورم عشان لو المستخدم داس "تعديل"
            document.getElementById('bmName').value = data.name;
            document.getElementById('bmCode').value = data.code;

        } catch (error) {
            console.error("الرابط تالف:", error);
            window.location.hash = ''; // تصفير الرابط لو بايظ
        }
    } else {
        // إخفاء التثبيت وإظهار الإنشاء
        installMode.style.display = 'none';
        createMode.style.display = 'block';
        document.getElementById('resultBox').style.display = 'none';
    }
}

// 4. ربط الأحداث (Event Listeners)

// أ. المراقبة الدائمة لتغير الرابط (هنا حل المشكلة)
window.addEventListener('hashchange', renderView);

// ب. أحداث واجهة الإنشاء
document.getElementById('generateBtn').addEventListener('click', async () => {
    const name = document.getElementById('bmName').value;
    const code = document.getElementById('bmCode').value;
    if (!code.trim()) return alert("يرجى إدخال كود الجافاسكريبت أولاً!");

    const compressedHash = await compressData({ name, code });
    const finalUrl = window.location.href.split('#')[0] + '#' + compressedHash;

    const outputInput = document.getElementById('outputUrl');
    outputInput.value = finalUrl;
    document.getElementById('resultBox').style.display = 'block';
    document.getElementById('successMsg').style.display = 'none';
});

document.getElementById('outputUrl').addEventListener('click', function () {
    this.select();
    document.execCommand('copy');
    document.getElementById('successMsg').style.display = 'block';
});

// ج. أحداث واجهة التثبيت
const btn = document.getElementById('toolBtn');
const overlay = document.getElementById('dragOverlay');
btn.addEventListener('dragstart', () => overlay.classList.add('active'));
btn.addEventListener('dragend', () => overlay.classList.remove('active'));
btn.addEventListener('click', (e) => e.preventDefault());

document.getElementById('editBtn').addEventListener('click', () => {
    // تفريغ الرابط هينادي تلقائياً حدث hashchange ويرجعنا لوضع الإنشاء
    window.location.hash = '';
});

// 5. التشغيل الأولي عند فتح الصفحة
renderView();
