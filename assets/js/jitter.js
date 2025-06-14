document.addEventListener("DOMContentLoaded", () => {
  const hoverZones = document.querySelectorAll('.hover-zone');

  hoverZones.forEach(zone => {
    const highlight = zone.querySelector('.highlight-box');
    const eraser = zone.querySelector('.eraser-box');

    let lastLeaveTime = 0;
    let lastEraserTime = 0;

    zone.addEventListener('mouseenter', () => {
      highlight.classList.remove('wipe-in', 'wipe-in-slow');
      void highlight.offsetWidth;

      const timeSinceLeave = Date.now() - lastLeaveTime;
      if (timeSinceLeave < 300) {
        highlight.classList.add('wipe-in');
      } else {
        highlight.classList.add('wipe-in-slow');
      }
    });

    zone.addEventListener('mouseleave', () => {
      const now = Date.now();
      lastLeaveTime = now;

      highlight.classList.remove('wipe-in', 'wipe-in-slow');

      const timeSinceLastEraser = now - lastEraserTime;
      if (timeSinceLastEraser < 150) return; // skip if too soon

      lastEraserTime = now;

      eraser.classList.remove('eraser-slide', 'eraser-slide-fast');
      void eraser.offsetWidth;

      if (highlight.classList.contains('wipe-in')) {
        eraser.classList.add('eraser-slide-fast');
      } else {
        eraser.classList.add('eraser-slide');
      }
    });
  });
});
