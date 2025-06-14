document.addEventListener("DOMContentLoaded", () => {
  const hoverZones = document.querySelectorAll('.hover-zone');

  hoverZones.forEach(zone => {
    const highlight = zone.querySelector('.highlight-box');
    const eraser = zone.querySelector('.eraser-box');
    const label = zone.textContent.trim().toLowerCase();

    let lastLeaveTime = 0;

    zone.addEventListener('mouseenter', () => {
      highlight.classList.remove('wipe-in', 'wipe-in-slow');
      void highlight.offsetWidth;

      const timeSinceLeave = Date.now() - lastLeaveTime;
      highlight.classList.add(timeSinceLeave < 300 ? 'wipe-in' : 'wipe-in-slow');
    });

    zone.addEventListener('mouseleave', () => {
      lastLeaveTime = Date.now();

      highlight.classList.remove('wipe-in', 'wipe-in-slow');

      if (label === 'projects') return;

      eraser.classList.remove('eraser-slide', 'eraser-slide-fast');
      void eraser.offsetWidth;

      eraser.classList.add(highlight.classList.contains('wipe-in') ? 'eraser-slide-fast' : 'eraser-slide');
    });
  });
});
