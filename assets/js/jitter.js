document.addEventListener("DOMContentLoaded", () => {
  const hoverZones = document.querySelectorAll('.hover-zone');

  hoverZones.forEach(zone => {
    const highlight = zone.querySelector('.highlight-box');
    const eraser = zone.querySelector('.eraser-box');

    let lastLeaveTime = 0;

    zone.addEventListener('mouseenter', () => {
      const now = Date.now();
      const timeSinceLeave = now - lastLeaveTime;

      // Reset highlight
      highlight.classList.remove('wipe-in', 'wipe-in-slow');
      void highlight.offsetWidth; // trigger reflow

      // Trigger highlight animation
      if (timeSinceLeave < 300) {
        highlight.classList.add('wipe-in');
      } else {
        highlight.classList.add('wipe-in-slow');
      }
    });

    zone.addEventListener('mouseleave', () => {
      lastLeaveTime = Date.now();

      // Reset and trigger eraser
      eraser.classList.remove('eraser-slide', 'eraser-slide-fast');
      void eraser.offsetWidth; // trigger reflow

      if (highlight.classList.contains('wipe-in')) {
        eraser.classList.add('eraser-slide-fast');
      } else {
        eraser.classList.add('eraser-slide');
      }

      // Remove highlight after erasing
      highlight.classList.remove('wipe-in', 'wipe-in-slow');
    });
  });
});
