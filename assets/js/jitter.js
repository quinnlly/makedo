document.addEventListener("DOMContentLoaded", () => {
  const zones = document.querySelectorAll(".hover-zone");

  zones.forEach(zone => {
    const box = zone.querySelector(".highlight-box");

    let jitter = {};

    zone.addEventListener("mouseenter", () => {
      const existingEraser = zone.querySelector(".eraser-box");

      // Remove any existing eraser to prevent reuse artifacts
      if (existingEraser) {
        existingEraser.remove();
      }

      box.classList.remove("wipe-in", "wipe-in-slow");
      void box.offsetWidth;

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
      box.style.opacity = "1";
    });

    zone.addEventListener("mouseleave", () => {
      const eraser = document.createElement("div");
      eraser.classList.add("eraser-box", "eraser-slide");

      // ✅ Use full width of hover-zone, ignore jitter
      eraser.style.left = "0%";
      eraser.style.width = "100%";

      eraser.style.bottom = box.style.bottom;
      eraser.style.top = "-25%";
      eraser.style.height = "200%";

      zone.appendChild(eraser);

      eraser.addEventListener("animationend", () => {
        box.classList.remove("wipe-in", "wipe-in-slow");
        box.style.opacity = "0";
        eraser.remove();

        if (zone.matches(":hover")) {
          box.classList.remove("wipe-in", "wipe-in-slow");
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
          box.style.opacity = "1";
        }
      });
    });
  });
});
