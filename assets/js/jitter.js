document.addEventListener("DOMContentLoaded", () => {
  const hoverZones = document.querySelectorAll('.hover-zone');

  let globalLastWipeTime = 0;
  const wipeCooldown = 150; // ms between allowed wipes

  hoverZones.forEach(zone => {
    const highlight = zone.querySelector('.highlight-box');
    const eraser = zone.querySelector('.eraser-box');

    let localLastLeave = 0;

    zone.addEventListener('mouseenter', () => {
      const now = Date.now();
      const timeSinceGlobal = now - globalLastWipeTime;
      const timeSinceLocal = now - localLastLeave;

      highlight.classList.remove('wipe-in', 'wipe-in-slow');
      void highlight.offsetWidth;

      if (timeSinceGlobal > wipeCooldown) {
        highlight.classList.add(timeSinceLocal < 300 ? 'wipe-in' : 'wipe-in-slow');
        globalLastWipeTime = now;
      }
    });

    zone.addEventListener('mouseleave', () => {
      localLastLeave = Date.now();

      highlight.classList.remove('wipe-in', 'wipe-in-slow');

      eraser.classList.remove('eraser-slide', 'eraser-slide-fast');
      void eraser.offsetWidth;

      eraser.classList.add(highlight.classList.contains('wipe-in') ? 'eraser-slide-fast' : 'eraser-slide');
    });
  });
});
