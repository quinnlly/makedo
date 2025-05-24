document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    const box = link.querySelector(".highlight-box");

    let jitter = {};

    link.addEventListener("mouseenter", () => {
      // Generate and apply jitter variables
      jitter = {
        left: `${Math.random() * 4 - 2}%`,
        bottom: `${Math.random() * 4 - 2}%`,
        width: `${100 + Math.random() * 6}%`,
        rotate: `${(Math.random() - 0.5) * 3}deg`
      };

      for (const key in jitter) {
        box.style.setProperty(`--jitter-${key}`, jitter[key]);
      }

      box.classList.remove("wipe-out");
      box.classList.add("wipe-in");
      box.style.opacity = "1";
    });

    link.addEventListener("mouseleave", () => {
      // Create eraser box
      const eraser = document.createElement("div");
      eraser.classList.add("eraser-box", "eraser-slide");

      // Match highlight-box dimensions
      eraser.style.left = box.style.left;
      eraser.style.bottom = box.style.bottom;
      eraser.style.width = box.style.width;

      // Set height and top to cover jitter
      eraser.style.top = "-25%";
      eraser.style.height = "200%";

      // Align background with current scroll position
      eraser.style.backgroundPosition = `${window.scrollX}px ${window.scrollY}px`;

      // Append eraser to same container as highlight
      link.appendChild(eraser);

      // Remove highlight after wipe is complete
      eraser.addEventListener("animationend", () => {
        box.classList.remove("wipe-in");
        box.style.opacity = "0";
        eraser.remove();
      });
    });
  });
});

