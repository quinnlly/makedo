document.addEventListener("DOMContentLoaded", () => {
  const zones = document.querySelectorAll(".hover-zone");

  zones.forEach(zone => {
    const mask = zone.querySelector(".highlight-mask");
    const box = mask.querySelector(".highlight-box");

    let jitter = {};

    zone.addEventListener("mouseenter", () => {
      // Reset any prior animation classes
      mask.classList.remove("wipe-in", "wipe-in-slow", "wipe-out");
      void mask.offsetWidth; // force reflow to restart animation

      // Generate jitter values
      jitter = {
        left: `${Math.random() * 4 - 2}%`,
        bottom: `${Math.random() * 4 - 2}%`,
        rotate: `${(Math.random() - 0.5) * 3}deg`
      };

      // Apply jitter variables to box
      for (const key in jitter) {
        box.style.setProperty(`--jitter-${key}`, jitter[key]);
      }

      // Trigger wipe-in
      mask.classList.add("wipe-in");
    });

    zone.addEventListener("mouseleave", () => {
      mask.classList.remove("wipe-in", "wipe-in-slow");
      mask.classList.add("wipe-out");

      // Remove wipe-out after it completes
      mask.addEventListener("transitionend", function wipeDone(e) {
        // Only run on clip-path transition
        if (e.propertyName !== "clip-path") return;
        mask.removeEventListener("transitionend", wipeDone);
        mask.classList.remove("wipe-out");

        // If user is still hovering, trigger re-entry
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
