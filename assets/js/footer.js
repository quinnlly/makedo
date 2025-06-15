fetch('assets/html/footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer-placeholder').innerHTML = html;

    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  });
