document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    const box = link.querySelector(".highlight-box");

    link.addEventListener("mouseenter", () => {
      // === JITTER VARIABLES ===
      const jitterLeft = `${Math.random() * -5}%`;
      const jitterBottom = `${Math.random() * -5}%`;
      const jitterWidth = `${100 + Math.random() * 10}%`;
      const jitterRotate = `${(Math.random() - 0.5) * 4}deg`;

      box.style.setProperty('--jitter-left', jitterLeft);
      box.style.setProperty('--jitter-bottom', jitterBottom);
      box.style.setProperty('--jitter-width', jitterWidth);
      box.style.setProperty('--jitter-rotate', jitterRotate);

      // === Transform Origin & Animation ===
      box.style.transformOrigin = "left center";
      box.classList.remove("wipe-out");
      void box.offsetWidth;
      box.classList.add("wipe-in");
    });

    link.addEventListener("mouseleave", () => {
      box.style.transformOrigin = "right center";
      box.classList.remove("wipe-in");
      void box.offsetWidth;
      box.classList.add("wipe-out");
    });

    box.addEventListener("animationend", (e) => {
      if (e.animationName === "wipe-in") {
        box.classList.remove("wipe-in");
        box.style.opacity = "1";
      } else if (e.animationName === "wipe-out") {
        box.classList.remove("wipe-out");
        box.style.opacity = "0";
      }
    });
  });
});

