document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.nav-links a').forEach(link => {
    const highlight = link.querySelector('.highlight-box');

    link.addEventListener('mouseenter', () => {
      const left = (Math.random() * 10 - 5).toFixed(1) + '%';
      const bottom = (Math.random() * 10 - 5).toFixed(1) + '%';
      const width = (100 + Math.random() * 10 - 5).toFixed(1) + '%';
      const rotate = (Math.random() * 6 - 3).toFixed(1) + 'deg';

      // Set CSS variables for this link
      link.style.setProperty('--jitter-left', left);
      link.style.setProperty('--jitter-bottom', bottom);
      link.style.setProperty('--jitter-width', width);
      link.style.setProperty('--jitter-rotate', rotate);

      // Trigger wipe-in
      highlight.classList.remove('wipe-out');
      highlight.classList.add('wipe-in');
    });

    link.addEventListener('mouseleave', () => {
      // Trigger wipe-out
      highlight.classList.remove('wipe-in');
      highlight.classList.add('wipe-out');
    });
  });
});
