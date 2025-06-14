document.addEventListener("DOMContentLoaded", () => {
  const hoverZones = document.querySelectorAll('.hover-zone');

  hoverZones.forEach(zone => {
    const highlight = zone.querySelector('.highlight-box');
    const eraser = zone.querySelector('.eraser-box');

    // Get the visible text inside the hover zone
    const textLabel = zone.textContent.trim().toLowerCase();
    const isProjectsHover = textLabel === 'projects';

    let lastLeaveTime = 0;

    zone.addEventListener('mouseenter', () => {
      const now = Date.now();
      const timeSinceLeave = now - lastLeaveTime;

      // Handle "Projects" hover differently
      if (isProjectsHover) {
        highlight.classList.remove('wipe-in', 'wipe-in-slow');
        eraser.classList.remove('eraser-slide', 'eraser-slide-fast');
        return;
      }

      highlight.classList.remove('wipe-in', 'wipe-in-slow');
      void highlight.offsetWidth;

      if (timeSinceLeave < 300) {
        highlight.classList.add('wipe-in');
      } else {
        highlight.classList.add('wipe-in-slow');
      }
    });

    zone.addEventListener('mouseleave', () => {
      lastLeaveTime = Date.now();

      // Handle "Projects" hover differently
      if (isProjectsHover) {
        highlight.classList.remove('wipe-in', 'wipe-in-slow');
        eraser.classList.remove('eraser-slide', 'eraser-slide-fast');
        return;
      }

      eraser.classList.remove('eraser-slide', 'eraser-slide-fast');
      void eraser.offsetWidth;

      if (highlight.classList.contains('wipe-in')) {
        eraser.classList.add('eraser-slide-fast');
      } else {
        eraser.classList.add('eraser-slide');
      }

      highlight.classList.remove('wipe-in', 'wipe-in-slow');
    });
  });
});
