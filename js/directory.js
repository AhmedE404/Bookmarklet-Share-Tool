document.addEventListener("DOMContentLoaded", async () => {
    // تهيئة الترجمة بمسار جذري
    await window.initI18n('');

    const tableBody = document.getElementById('tableBody');
    const searchInput = document.getElementById('searchInput');
    const activeFiltersContainer = document.getElementById('activeFilters');

    let allData = [];
    let searchQuery = '';
    let filters = { category: null, author: null, date: null };
    let sortConfig = { key: 'title', asc: true };

    async function fetchRegistry() {
        try {
            const response = await fetch('data/registry.json');
            allData = await response.json();
            renderTable();
        } catch (error) {
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:red;">Failed to load registry: ${error.message}</td></tr>`;
        }
    }

    async function fetchAndEncodeCode(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) return null;
            const rawCode = await response.text();
            const minified = rawCode.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').replace(/\s+/g, ' ').trim();
            return `javascript:${encodeURIComponent(minified)}`;
        } catch (e) { return null; }
    }

    function updateSortIcons() {
        document.querySelectorAll('th[data-sort]').forEach(th => {
            const iconSpan = th.querySelector('.sort-icon');
            if (iconSpan) {
                if (th.getAttribute('data-sort') === sortConfig.key) {
                    iconSpan.innerHTML = sortConfig.asc ? '&#8593;' : '&#8595;';
                    iconSpan.style.opacity = '1';
                } else {
                    iconSpan.innerHTML = '';
                }
            }
        });
    }

    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const key = th.getAttribute('data-sort');
            sortConfig.asc = sortConfig.key === key ? !sortConfig.asc : true;
            sortConfig.key = key;
            renderTable();
        });
    });

    async function renderTable() {
        if (!allData.length) return;
        updateSortIcons();

        let filtered = allData.filter(item => {
            const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchCat = filters.category ? item.category === filters.category : true;
            const matchAuth = filters.author ? item.author.name === filters.author : true;
            const matchDate = filters.date ? item.added_date === filters.date : true;
            return matchSearch && matchCat && matchAuth && matchDate;
        });

        filtered.sort((a, b) => {
            let valA = sortConfig.key === 'author' ? a.author.name.toLowerCase() : a[sortConfig.key].toLowerCase();
            let valB = sortConfig.key === 'author' ? b.author.name.toLowerCase() : b[sortConfig.key].toLowerCase();
            if (valA < valB) return sortConfig.asc ? -1 : 1;
            if (valA > valB) return sortConfig.asc ? 1 : -1;
            return 0;
        });

        tableBody.innerHTML = '';
        if (filtered.length === 0) {
            const emptyText = window.translations['emptyState'] || 'No bookmarklets match your criteria.';
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 30px;">${emptyText}</td></tr>`;
            return;
        }

        const dragBtnText = window.translations['dragBtn'] || 'Drag Me';

        for (const item of filtered) {
            const encodedUrl = await fetchAndEncodeCode(item.file);
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td class="name-cell"><a href="#" class="action-builder" data-id="${item.id}">${item.title}</a></td>
                <td class="desc-col" title="${item.description}"><a href="#" class="action-builder" data-id="${item.id}">${item.description}</a></td>
                <td><span class="clickable" data-filter-type="category" data-filter-val="${item.category}">${item.category}</span></td>
                <td><span class="clickable" data-filter-type="author" data-filter-val="${item.author.name}">${item.author.name}</span></td>
                <td><span class="clickable" data-filter-type="date" data-filter-val="${item.added_date}">${item.added_date}</span></td>
                <td>
                    <a href="${encodedUrl || '#'}" class="btn-drag-sm" data-code="${encodedUrl || ''}" onclick="event.preventDefault()" title="${item.title}">${dragBtnText}</a>
                </td>
            `;
            tableBody.appendChild(tr);
        }
    }

    tableBody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('clickable')) {
            const type = e.target.getAttribute('data-filter-type');
            const val = e.target.getAttribute('data-filter-val');
            filters[type] = val;
            updateFiltersUI();
            renderTable();
            return;
        }

        const dragBtn = e.target.closest('.btn-drag-sm');
        if (dragBtn) {
            e.preventDefault();
            const code = dragBtn.getAttribute('data-code');
            if (code) {
                navigator.clipboard.writeText(decodeURIComponent(code.replace('javascript:', ''))).then(() => {
                    window.showToast(window.translations['copiedToast'] || 'Copied to clipboard!');
                });
            }
            return;
        }

        const builderLink = e.target.closest('.action-builder');
        if (builderLink) {
            e.preventDefault();
            const id = builderLink.getAttribute('data-id');
            window.location.href = `builder/#id=${id}`;
        }
    });

    searchInput.addEventListener('input', (e) => { searchQuery = e.target.value; renderTable(); });

    function updateFiltersUI() {
        activeFiltersContainer.innerHTML = '';
        let hasFilters = false;
        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                hasFilters = true;
                const tag = document.createElement('div');
                tag.className = 'filter-tag';
                tag.innerHTML = `${filters[key]} <span style="cursor:pointer" data-clear="${key}">✕</span>`;
                activeFiltersContainer.appendChild(tag);
            }
        });

        if (hasFilters) {
            const clearBtn = document.createElement('button');
            clearBtn.className = 'clear-btn';
            clearBtn.innerText = window.translations['clearFilters'] || 'Clear Filters';
            clearBtn.onclick = () => {
                filters = { category: null, author: null, date: null };
                updateFiltersUI();
                renderTable();
            };
            activeFiltersContainer.appendChild(clearBtn);
        }
    }

    activeFiltersContainer.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-clear')) {
            const key = e.target.getAttribute('data-clear');
            filters[key] = null;
            updateFiltersUI();
            renderTable();
        }
    });

    // إعادة الرسم عند تغيير اللغة
    window.addEventListener('i18nReady', () => {
        renderTable();
        updateFiltersUI();
    });

    fetchRegistry();
});