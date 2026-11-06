// FAQ Toggle
    function toggleFaq(el) {
        const item = el.parentElement;
        const allItems = document.querySelectorAll('.faq-item');
        allItems.forEach(i => {
            if (i !== item) {
                i.classList.remove('active');
                i.querySelector('.faq-question i').className = 'fa-solid fa-plus';
            }
        });
        item.classList.toggle('active');
        const icon = el.querySelector('i');
        if (item.classList.contains('active')) {
            icon.className = 'fa-solid fa-minus';
        } else {
            icon.className = 'fa-solid fa-plus';
        }
    }
    // Blog Tab Switch
    function switchBlogTab(el) {
        document.querySelectorAll('.blog-tab').forEach(t => t.classList.remove('active'));
        el.classList.add('active');
    }
