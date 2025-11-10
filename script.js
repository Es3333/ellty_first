const pageItems = document.querySelectorAll('.page-item');
const allPagesItem = document.querySelector('[data-page="all"]');
const individualPages = document.querySelectorAll('.page-item:not([data-page="all"])');
const doneButton = document.querySelector('.done-button');

// Toggle checkbox on click
pageItems.forEach(item => {
    item.addEventListener('click', () => {
        const checkbox = item.querySelector('.checkbox');
        const isAllPages = item.dataset.page === 'all';

        if (isAllPages) {
            // Toggle all pages
            const isChecked = checkbox.classList.contains('checked');
            checkbox.classList.toggle('checked');

            // Update all individual pages
            individualPages.forEach(page => {
                const pageCheckbox = page.querySelector('.checkbox');
                if (isChecked) {
                    pageCheckbox.classList.remove('checked');
                } else {
                    pageCheckbox.classList.add('checked');
                }
            });
        } else {
            // Toggle individual page
            checkbox.classList.toggle('checked');
            updateAllPagesCheckbox();
        }
    });
});

// Update "All pages" checkbox based on individual selections
function updateAllPagesCheckbox() {
    const allCheckboxes = Array.from(individualPages).map(page =>
        page.querySelector('.checkbox')
    );
    const allChecked = allCheckboxes.every(cb => cb.classList.contains('checked'));
    const allPagesCheckbox = allPagesItem.querySelector('.checkbox');

    if (allChecked) {
        allPagesCheckbox.classList.add('checked');
    } else {
        allPagesCheckbox.classList.remove('checked');
    }
}

// Done button action
doneButton.addEventListener('click', () => {
    const selectedPages = [];
    individualPages.forEach(page => {
        const checkbox = page.querySelector('.checkbox');
        if (checkbox.classList.contains('checked')) {
            selectedPages.push(page.dataset.page);
        }
    });

    if (selectedPages.length === individualPages.length) {
        alert('Selected: All pages');
    } else if (selectedPages.length > 0) {
        alert(`Selected pages: ${selectedPages.join(', ')}`);
    } else {
        alert('No pages selected');
    }
});