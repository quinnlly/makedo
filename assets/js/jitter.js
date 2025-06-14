document.addEventListener("DOMContentLoaded", () => {
  const hoverZones = document.querySelectorAll('.hover-zone');

  hoverZones.forEach(zone => {
    const highlight = zone.querySelector('.highlight-box');
    const eraser = zone.querySelector('.eraser-box');
    const text = zone.textContent.trim().toLowerCase();

    const isProjects = text === "projects";
    let lastLeaveTime = 0;

    zone.addEventListener('mouseenter', () => {
      if (isProjects) return;

      const now = Date.now();
      const timeSinceLeave = now - lastLeaveTime;

      highlight.classList.remove('wipe-in', 'wipe-in-slow');
      void highlight.offsetWidth;

      if (timeSinceLeave < 300) {
        highlight.classList.add('wipe-in');
      } else {
        highlight.classList.add('wipe-in-slow');
      }
    });

    zone.addEventListener('mouseleave', () => {
      if (isProjects) return;

      lastLeaveTime = Date.now();

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
