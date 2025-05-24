document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    const box = link.querySelector(".highlight-box");

    let jitterVars = {};

    link.addEventListener("mouseenter", () => {
      // Generate jitter
      jitterVars = {
        left: `${Math.random() * 4 - 2}%`,
        bottom: `${Math.random() * 4 - 2}%`,
        width: `${100 + Math.random() * 6}%`,
        rotate: `${(Math.random() - 0.5) * 3}deg`
      };

      // Apply jitter
      for (const key in jitterVars) {
        box.style.setProperty(`--jitter-${key}`, jitterVars[key]);
      }

      box.classList.remove("wipe-out");
      box.classList.add("wipe-in");
    });

    link.addEventListener("mouseleave", () => {
      // Reapply the exact same jitter values
      for (const key in jitterVars) {
        box.style.setProperty(`--jitter-${key}`, jitterVars[key]);
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
