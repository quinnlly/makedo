document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    const box = link.querySelector(".highlight-box");

    let jitter = {};

    link.addEventListener("mouseenter", () => {
      // Generate jitter values once per hover
      jitter = {
        left: `${Math.random() * 4 - 2}%`,
        bottom: `${Math.random() * 4 - 2}%`,
        width: `${100 + Math.random() * 6}%`,
        rotate: `${(Math.random() - 0.5) * 3}deg`
      };

      // Apply jitter variables to the highlight-box
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

      // Match position/size of highlight-box
      eraser.style.left = box.style.left;
      eraser.style.bottom = box.style.bottom;
      eraser.style.width = box.style.width;
      eraser.style.height = box.offsetHeight + "px";

      // Append over highlight
      link.appendChild(eraser);

      // Clean up after wipe
      eraser.addEventListener("animationend", () => {
        box.classList.remove("wipe-in");
        box.style.opacity = "0";
        eraser.remove();
      });
    });
  });
});

