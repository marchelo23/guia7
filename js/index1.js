document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const guideItems = document.querySelectorAll('.list-group-item');

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();

        guideItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.classList.remove('hidden');
                // Highlight matching text
                const regex = new RegExp(searchTerm, 'gi');
                const itemText = item.textContent.split('<span class="badge">')[0];
                if (searchTerm) {
                    item.innerHTML = itemText.replace(regex, match => `<mark>${match}</mark>`) +
                        `<span class="badge bg-primary rounded-pill">${item.querySelector('.badge').textContent}</span>`;
                } else {
                    item.innerHTML = itemText +
                        `<span class="badge bg-primary rounded-pill">${item.querySelector('.badge').textContent}</span>`;
                }
            } else {
                item.classList.add('hidden');
            }
        });
    });

    // Add hover effect for list items
    guideItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add active state for clicked items
    guideItems.forEach(item => {
        item.addEventListener('click', function() {
            guideItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add keyboard navigation
    let currentFocus = -1;

    document.addEventListener('keydown', function(e) {
        const visibleItems = Array.from(guideItems).filter(item => !item.classList.contains('hidden'));

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentFocus = Math.min(currentFocus + 1, visibleItems.length - 1);
            updateFocus(visibleItems);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentFocus = Math.max(currentFocus - 1, 0);
            updateFocus(visibleItems);
        } else if (e.key === 'Enter' && currentFocus !== -1) {
            e.preventDefault();
            visibleItems[currentFocus].click();
        }
    });

    function updateFocus(visibleItems) {
        visibleItems.forEach((item, index) => {
            if (index === currentFocus) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });
    }
});