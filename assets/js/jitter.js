document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const left = (Math.random() * 10 - 5).toFixed(1) + '%';     // -5% to +5%
      const bottom = (Math.random() * 10 - 5).toFixed(1) + '%';   // -5% to +5%
      const width = (100 + Math.random() * 10 - 5).toFixed(1) + '%'; // 95%–105%
      link.style.setProperty('--jitter-left', left);
      link.style.setProperty('--jitter-bottom', bottom);
      link.style.setProperty('--jitter-width', width);
    });
  });
});
