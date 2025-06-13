document.addEventListener("DOMContentLoaded", () => {
  const zones = document.querySelectorAll(".hover-zone");

  zones.forEach(zone => {
    const mask = zone.querySelector(".highlight-mask");
    const box = mask.querySelector(".highlight-box");

    let jitter = {};

    zone.addEventListener("mouseenter", () => {
      mask.classList.remove("wipe-in", "wipe-in-slow", "wipe-out");
      void mask.offsetWidth; // force reflow to restart animation

      // Apply jitter values
      jitter = {
        left: `${Math.random() * 4 - 2}%`,
        bottom: `${Math.random() * 4 - 2}%`,
        rotate: `${(Math.random() - 0.5) * 3}deg`
      };

      for (const key in jitter) {
        box.style.setProperty(`--jitter-${key}`, jitter[key]);
      }

      mask.classList.add("wipe-in");
    });

    zone.addEventListener("mouseleave", () => {
      mask.classList.remove("wipe-in", "wipe-in-slow");
      mask.classList.add("wipe-out");

      mask.addEventListener("transitionend", function wipeDone() {
        mask.removeEventListener("transitionend", wipeDone);
        mask.classList.remove("wipe-out");

        // If the user re-hovers mid-exit, trigger a slower re-entry
        if (zone.matches(":hover")) {
          void mask.offsetWidth;

          jitter = {
            left: `${Math.random() * 4 - 2}%`,
            bottom: `${Math.random() * 4 - 2}%`,
            rotate: `${(Math.random() - 0.5) * 3}deg`
          };

          for (const key in jitter) {
            box.style.setProperty(`--jitter-${key}`, jitter[key]);
          }

          mask.classList.add("wipe-in-slow");
        }
      });
    });
  });
});
