document.addEventListener("DOMContentLoaded", () => {
  const zones = document.querySelectorAll(".hover-zone");

  zones.forEach(zone => {
    const box = zone.querySelector(".highlight-box");

    let jitter = {};

    zone.addEventListener("mouseenter", () => {
      box.classList.remove("wipe-in", "wipe-out", "wipe-in-slow");
      void box.offsetWidth; // force reflow

      // Generate new jitter values
      jitter = {
        left: `${Math.random() * 4 - 2}%`,
        bottom: `${Math.random() * 4 - 2}%`,
        width: `${100 + Math.random() * 6}%`,
        rotate: `${(Math.random() - 0.5) * 3}deg`
      };

      for (const key in jitter) {
        box.style.setProperty(`--jitter-${key}`, jitter[key]);
      }

      box.classList.add("wipe-in");
    });

    zone.addEventListener("mouseleave", () => {
      box.classList.remove("wipe-in", "wipe-in-slow");
      box.classList.add("wipe-out");

      box.addEventListener("transitionend", function wipeOutDone() {
        box.removeEventListener("transitionend", wipeOutDone);
        box.classList.remove("wipe-out");

        // If still hovered, re-trigger slow wipe-in
        if (zone.matches(":hover")) {
          void box.offsetWidth;

          jitter = {
            left: `${Math.random() * 4 - 2}%`,
            bottom: `${Math.random() * 4 - 2}%`,
            width: `${100 + Math.random() * 6}%`,
            rotate: `${(Math.random() - 0.5) * 3}deg`
          };

          for (const key in jitter) {
            box.style.setProperty(`--jitter-${key}`, jitter[key]);
          }

          box.classList.add("wipe-in-slow");
        }
      });
    });
  });
});
