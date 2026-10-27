renderHeader('');
renderFooter();
document.querySelectorAll('[data-site]').forEach((el) => (el.textContent = site[el.dataset.site]));
