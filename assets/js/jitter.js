document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    const box = link.querySelector(".highlight-box");

    link.addEventListener("mouseenter", () => {
      // Set origin for wiping in (draw from left)
      box.style.transformOrigin = "left center";

      box.classList.remove("wipe-out");
      void box.offsetWidth; // trigger reflow just in case
      box.classList.add("wipe-in");
    });

    link.addEventListener("mouseleave", () => {
      // Set origin for wiping out (erase forward)
      box.style.transformOrigin = "right center";

      box.classList.remove("wipe-in");
      void box.offsetWidth; // reflow again before switching
      box.classList.add("wipe-out");
    });

    // Optional: clean up after animation ends
    box.addEventListener("animationend", (e) => {
      if (e.animationName === "wipe-in") {
        box.classList.remove("wipe-in");
        box.style.opacity = "1"; // ensure stays visible
      } else if (e.animationName === "wipe-out") {
        box.classList.remove("wipe-out");
        box.style.opacity = "0"; // ensure fully hidden
      }
    });
  });
});
