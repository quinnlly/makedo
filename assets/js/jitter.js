document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    const box = link.querySelector(".highlight-box");

    let jitter = {};

    link.addEventListener("mouseenter", () => {
      // Generate jitter only once
      jitter = {
        left: `${Math.random() * 4 - 2}%`,
        bottom: `${Math.random() * 4 - 2}%`,
        width: `${100 + Math.random() * 6}%`,
        rotate: `${(Math.random() - 0.5) * 3}deg`
      };

      // Apply jitter vars
      for (const key in jitter) {
        box.style.setProperty(`--jitter-${key}`, jitter[key]);
      }

      box.classList.remove("wipe-out");
      box.classList.add("wipe-in");
      box.style.opacity = "1";
    });

    link.addEventListener("mouseleave", () => {
      // Reapply jitter for visual continuity
      for (const key in jitter) {
        box.style.setProperty(`--jitter-${key}`, jitter[key]);
      }

      box.classList.remove("wipe-in");
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
