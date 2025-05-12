document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const left = (Math.random() * 10 - 5).toFixed(1) + '%';         // -5% to +5%
      const bottom = (Math.random() * 10 - 5).toFixed(1) + '%';       // -5% to +5%
      const width = (100 + Math.random() * 10 - 5).toFixed(1) + '%';  // 95%–105%
      const rotate = (Math.random() * 6 - 3).toFixed(1) + 'deg';      // -3deg to +3deg

      // Determine the top position of the link relative to the page
      const rect = link.getBoundingClientRect();
      const top = rect.top + window.scrollY + rect.height / 2;

      link.style.setProperty('--jitter-left', left);
      link.style.setProperty('--jitter-bottom', bottom); // optional
      link.style.setProperty('--jitter-width', width);
      link.style.setProperty('--jitter-rotate', rotate);
      link.style.setProperty('--highlight-top', `${top}px`);
    });
  });
});
