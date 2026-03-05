document.addEventListener("DOMContentLoaded", async () => {
    // تهيئة الترجمة بمسار فرعي
    await window.initI18n('../');

    async function renderView() {
        const hash = window.location.hash.substring(1);
        const installMode = document.getElementById('installMode');
        const createMode = document.getElementById('createMode');

        if (hash) {
            try {
                let data = {};

                if (hash.startsWith('id=')) {
                    const id = hash.split('=')[1];
                    const regResponse = await fetch('../data/registry.json');
                    const registry = await regResponse.json();
                    const item = registry.find(i => i.id === id);

                    if (!item) throw new Error("Item not found");

                    const codeResponse = await fetch(`../${item.file}`);
                    const rawCode = await codeResponse.text();

                    data = {
                        name: item.title, desc: item.description, cat: item.category,
                        author: item.author.name, github: item.author.github, code: rawCode,
                        isFromRegistry: true
                    };
                } else {
                    data = await window.decompressData(hash);
                    data.isFromRegistry = false;
                }

                // const btn = document.getElementById('toolBtn');
                // btn.innerHTML = (data.name || window.translations['dragBtn'] || "Drag Me");

                const btn = document.getElementById('toolBtn');
                const dragText = window.translations['dragBtn'] || "Drag Me";

                // 1. عرض الكلمة للمستخدم عن طريق الـ CSS
                btn.setAttribute('data-drag-text', dragText);

                // 2. حقن الاسم الحقيقي للأداة عشان المتصفح يسحبه
                const realNameSpan = document.getElementById('toolRealName');
                if (realNameSpan) {
                    realNameSpan.textContent = data.name || 'Bookmarklet';
                }
                document.getElementById('installTitle').innerText = data.name || window.translations['installTitle'];
                document.getElementById('installDesc').innerText = data.desc || '';

                const metaDiv = document.getElementById('installMeta');
                if (data.isFromRegistry) {
                    metaDiv.style.display = 'flex';
                    document.getElementById('installCat').innerText = data.cat;
                    document.getElementById('installAuthor').innerText = `@${data.author}`;
                } else {
                    metaDiv.style.display = 'none';
                }

                let safeCode = data.code.trim();
                if (safeCode.startsWith('javascript:')) safeCode = safeCode.replace('javascript:', '');
                btn.href = 'javascript:' + encodeURIComponent(safeCode);
                btn.setAttribute('data-code', btn.href);

                createMode.style.display = 'none';
                installMode.style.display = 'block';

                document.getElementById('bmName').value = data.name || '';
                document.getElementById('bmDesc').value = data.desc || '';
                document.getElementById('bmCat').value = data.cat || '';
                document.getElementById('bmCode').value = data.code || '';

            } catch (error) {
                console.error("Link corrupted or item missing:", error);
                window.location.hash = '';
            }
        } else {
            installMode.style.display = 'none';
            createMode.style.display = 'block';
            document.getElementById('shareResult').style.display = 'none';
            document.getElementById('prGuide').style.display = 'none';
        }
    }

    window.addEventListener('hashchange', renderView);

    document.getElementById('editBtn').addEventListener('click', () => {
        document.getElementById('bmAuthor').value = '';
        document.getElementById('bmGithub').value = '';
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const btnShare = document.getElementById('btnShare');
    const btnSubmit = document.getElementById('btnSubmit');
    const shareResult = document.getElementById('shareResult');
    const prGuide = document.getElementById('prGuide');

    btnShare.addEventListener('click', async () => {
        const name = document.getElementById('bmName').value.trim();
        const desc = document.getElementById('bmDesc').value.trim();
        const code = document.getElementById('bmCode').value.trim();

        if (!code) return alert("JavaScript code is required.");

        const compressedHash = await window.compressData({ name, desc, code });
        const finalUrl = window.location.href.split('#')[0] + '#' + compressedHash;

        document.getElementById('outputUrl').value = finalUrl;
        prGuide.style.display = 'none';
        shareResult.style.display = 'block';
    });

    document.getElementById('outputUrl').addEventListener('click', function () {
        this.select();
        document.execCommand('copy');
        window.showToast(window.translations['copiedToast'] || 'Copied!');
    });

    btnSubmit.addEventListener('click', () => {
        const name = document.getElementById('bmName').value.trim() || "Awesome Tool";
        const cat = document.getElementById('bmCat').value.trim() || "Uncategorized";
        const desc = document.getElementById('bmDesc').value.trim() || "No description provided.";
        const author = document.getElementById('bmAuthor').value.trim() || "Contributor";
        const github = document.getElementById('bmGithub').value.trim() || "github";
        const code = document.getElementById('bmCode').value.trim();

        if (!code) return alert("JavaScript code is required to submit.");

        const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const today = new Date().toISOString().split('T')[0];

        const jsonObj = {
            id: id,
            title: name,
            description: desc,
            category: cat,
            author: { name: author, github: github },
            file: `bookmarklets/${id}.js`,
            added_date: today
        };

        document.getElementById('codeSnippet').textContent = code;
        document.getElementById('jsonSnippet').textContent = JSON.stringify(jsonObj, null, 2) + ',';

        shareResult.style.display = 'none';
        prGuide.style.display = 'block';
        prGuide.scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelectorAll('.btn-copy-code').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const text = document.getElementById(targetId).textContent;
            navigator.clipboard.writeText(text).then(() => {
                window.showToast(window.translations['copiedToast'] || 'Copied!');
            });
        });
    });

    const toolBtn = document.getElementById('toolBtn');
    toolBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const code = toolBtn.getAttribute('data-code');
        if (code) {
            navigator.clipboard.writeText(decodeURIComponent(code.replace('javascript:', ''))).then(() => {
                window.showToast(window.translations['copiedToast'] || 'Copied!');
            });
        }
    });

    // إعادة الرسم إذا تغيرت اللغة
    window.addEventListener('i18nReady', () => {
        renderView();
    });

    renderView();
});