document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const left = (Math.random() * 10 - 5).toFixed(1) + '%';
      const bottom = (Math.random() * 10 - 5).toFixed(1) + '%';
      const width = (100 + Math.random() * 10 - 5).toFixed(1) + '%';
      const skew = (Math.random() * 6 - 3).toFixed(1) + 'deg'; // -3deg to +3deg
      link.style.setProperty('--jitter-left', left);
      link.style.setProperty('--jitter-bottom', bottom);
      link.style.setProperty('--jitter-width', width);
      link.style.setProperty('--jitter-skew', skew);
    });
  });
});
