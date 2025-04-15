function getEventObjectType(target) {
    // Categorize based on tagName and input types
    if (target.tagName === 'IMG') {
        return 'image';
    } else if (target.tagName === 'A') {
        return 'link';
    } else if (target.tagName === 'BUTTON') {
        return 'button';
    } else if (target.tagName === 'SELECT') {
        return 'drop-down';
    } else if (target.tagName === 'INPUT') {
        if (target.type === 'radio') {
            return 'radio';
        } else if (target.type === 'text') {
            return 'text box';
        } else {
            return 'text box'; // Default for other input types
        }
    } else if (target.tagName === 'TEXTAREA') {
        return 'text';
    } else if (target.closest('form')) {
        return 'form';
    } else {
        return 'text'; // Default fallback
    }
}


// Log view events
window.addEventListener('DOMContentLoaded', () => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, view, page loaded`);
});

// Log click events
document.addEventListener('click', (e) => {
    const timestamp = new Date().toISOString();
    const type = getEventObjectType(e.target);
    console.log(`${timestamp}, click, ${type}`);
});