// Original eraser-box version, artifact-free
document.addEventListener("DOMContentLoaded", () => {
  const zones = document.querySelectorAll(".hover-zone");

  zones.forEach(zone => {
    const box = zone.querySelector(".highlight-box");
    let eraseTimer = null;

    function randomJitter() {
      return {
        left  :  `${Math.random() * 2 }%`,        // 0-2 %   ➜ never negative
        bottom:  `${Math.random() * 4 - 2}%`,
        width :  `${100 + Math.random() * 6}%`,
        rotate:  `${(Math.random() - 0.5) * 3}deg`
      };
    }

    zone.addEventListener("mouseenter", () => {
      clearTimeout(eraseTimer);
      box.classList.remove("eraser-slide","eraser-slide-fast");

      const j = randomJitter();
      for (const k in j) box.style.setProperty(`--jitter-${k}`, j[k]);

      box.classList.remove("wipe-in","wipe-in-slow");
      void box.offsetWidth;              // restart CSS animation
      box.classList.add("wipe-in");
      box.style.opacity = "1";
    });

    zone.addEventListener("mouseleave", () => {
      // create eraser overlay only once per leave
      if (zone.querySelector(".eraser-box")) return;

      const eraser = document.createElement("div");
      eraser.className = "eraser-box eraser-slide";
      eraser.style.left   = box.style.left;
      eraser.style.bottom = box.style.bottom;
      eraser.style.width  = box.style.width;
      zone.appendChild(eraser);

      // after slide finishes, reset everything
      eraseTimer = setTimeout(() => {
        box.classList.remove("wipe-in","wipe-in-slow");
        box.style.opacity = "0";
        eraser.remove();

        // if the pointer is already back → slow wipe-in
        if (zone.matches(":hover")) {
          const j = randomJitter();
          for (const k in j) box.style.setProperty(`--jitter-${k}`, j[k]);
          box.classList.add("wipe-in-slow");
          box.style.opacity = "1";
        }
      }, 600);  //   matches .6 s eraserSlide
    });
  });
});
