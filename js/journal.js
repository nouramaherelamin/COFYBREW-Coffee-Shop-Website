/**
 * COFYBREW — Centralized Journal Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    initJournalPage();

    function initJournalPage() {
        const pills = document.querySelectorAll('.custom-pills .nav-link');
        const articles = document.querySelectorAll('.journal-card-article');

        if (!pills.length) return;

        pills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                e.preventDefault();

                // Reset all pills
                pills.forEach(p => {
                    p.classList.remove('active');
                    p.style.backgroundColor = '';
                    p.style.borderColor = '';
                    p.style.color = '';
                });

                // Set active pill
                pill.classList.add('active');
                pill.style.backgroundColor = 'var(--gold)';
                pill.style.borderColor = 'var(--gold)';
                pill.style.color = '#fff';

                const cat = pill.getAttribute('data-cat') || 'all';

                // Filter articles — look at the parent .journal-item which holds data-category
                articles.forEach(card => {
                    const container = card.closest('.journal-item') || card.closest('[data-category]') || card.closest('.col-lg-4') || card;
                    const cardCat = container.getAttribute('data-category') || 'all';

                    if (cat === 'all' || cardCat === cat) {
                        container.style.display = '';
                        container.classList.add('fade-in-up', 'visible');
                    } else {
                        container.style.display = 'none';
                    }
                });
            });
        });

        // Search Journals
        const journalSearch = document.getElementById('journalSearchInput');
        if (journalSearch) {
            journalSearch.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase().trim();

                // Reset active pill to "All" when searching
                if (term.length === 0) {
                    const allPill = document.querySelector('.custom-pills .nav-link[data-cat="all"]');
                    if (allPill) allPill.click();
                    return;
                }

                // Reset all pill styles first
                pills.forEach(p => {
                    p.classList.remove('active');
                    p.style.backgroundColor = '';
                    p.style.borderColor = '';
                    p.style.color = '';
                });

                articles.forEach(card => {
                    const container = card.closest('.journal-item') || card.closest('[data-category]') || card.closest('.col-lg-4') || card;
                    const title = (card.querySelector('.journal-card-title') || {}).textContent || '';
                    const desc  = (card.querySelector('p') || {}).textContent || '';

                    if (title.toLowerCase().includes(term) || desc.toLowerCase().includes(term)) {
                        container.style.display = '';
                    } else {
                        container.style.display = 'none';
                    }
                });
            });
        }
    }
});
