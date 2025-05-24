document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    const box = link.querySelector(".highlight-box");

    link.addEventListener("mouseenter", () => {
      const jitterLeft = `${Math.random() * 4 - 2}%`;
      const jitterBottom = `${Math.random() * 4 - 2}%`;
      const jitterWidth = `${100 + Math.random() * 6}%`;
      const jitterRotate = `${(Math.random() - 0.5) * 3}deg`;

      box.style.setProperty('--jitter-left', jitterLeft);
      box.style.setProperty('--jitter-bottom', jitterBottom);
      box.style.setProperty('--jitter-width', jitterWidth);
      box.style.setProperty('--jitter-rotate', jitterRotate);

      box.style.transformOrigin = 'left center'; // Prevent jump from origin mismatch
      box.classList.remove("wipe-out");
      box.classList.add("wipe-in");
    });

    link.addEventListener("mouseleave", () => {
      box.style.transformOrigin = 'right center'; // Anchor wipe-out correctly
      box.classList.remove("wipe-in");
      box.classList.add("wipe-out");
    });

    box.addEventListener("animationend", (e) => {
      if (e.animationName === "wipe-in") {
        box.classList.remove("wipe-in");
      } else if (e.animationName === "wipe-out") {
        box.classList.remove("wipe-out");
      }
    });
  });
});
