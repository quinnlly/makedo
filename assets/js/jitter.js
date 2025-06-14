document.addEventListener("DOMContentLoaded", () => {
  const zones = document.querySelectorAll(".hover-zone");
  let dropdownCloseTimeout = null;

  const randSkew = (magnitude) => {
    const sign = Math.random() < 0.5 ? -1 : 1;
    return sign * Math.pow(Math.random(), 0.5) * magnitude;
  };

  zones.forEach(zone => {
    const box = zone.querySelector(".highlight-box");
    let eraserBox = null;

    zone.addEventListener("mouseenter", () => {
      if (eraserBox) {
        eraserBox.remove();
        eraserBox = null;
      }

      box.classList.remove("wipe-in", "wipe-in-slow");
      void box.offsetWidth;

      const jitter = {
        left: `${randSkew(2)}%`,
        bottom: `${randSkew(2)}%`,
        width: `${100 + randSkew(10)}%`,
        rotate: `${randSkew(3)}deg`
      };

      for (const key in jitter) {
        box.style.setProperty(`--jitter-${key}`, jitter[key]);
      }

      box.classList.add("wipe-in");
      box.style.opacity = "1";
    });

    zone.addEventListener("mouseleave", () => {
      if (zone.matches(':hover')) return;

      if (eraserBox) {
        eraserBox.remove();
        eraserBox = null;
      }

      eraserBox = document.createElement("div");
      eraserBox.classList.add("eraser-box", "eraser-slide");

      // ✅ Clamp to the container bounds — no bleeding leftward
      eraserBox.style.left = "0";
      eraserBox.style.width = "100%";

      eraserBox.style.top = "-25%";
      eraserBox.style.bottom = "0";
      eraserBox.style.height = "200%";

      zone.appendChild(eraserBox);

      eraserBox.addEventListener("animationend", () => {
        box.classList.remove("wipe-in", "wipe-in-slow");
        box.style.opacity = "0";
        if (eraserBox) eraserBox.remove();
        eraserBox = null;

        if (zone.matches(":hover")) {
          box.classList.remove("wipe-in", "wipe-in-slow");
          void box.offsetWidth;

          const jitter = {
            left: `${randSkew(2)}%`,
            bottom: `${randSkew(2)}%`,
            width: `${100 + randSkew(10)}%`,
            rotate: `${randSkew(3)}deg`
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
