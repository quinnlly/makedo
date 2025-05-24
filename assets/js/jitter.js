document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    const box = link.querySelector(".highlight-box");

    let jitterVars = null; // Store per-hover jitter

    link.addEventListener("mouseenter", () => {
      // Generate & store jitter
      jitterVars = {
        left: `${Math.random() * 4 - 2}%`,
        bottom: `${Math.random() * 4 - 2}%`,
        width: `${100 + Math.random() * 6}%`,
        rotate: `${(Math.random() - 0.5) * 3}deg`
      };

      for (const key in jitterVars) {
        box.style.setProperty(`--jitter-${key}`, jitterVars[key]);
      }

      box.classList.remove("wipe-out");
      box.classList.add("wipe-in");
    });

    link.addEventListener("mouseleave", () => {
      // Re-apply same jitter to prevent visual shift
      if (jitterVars) {
        for (const key in jitterVars) {
          box.style.setProperty(`--jitter-${key}`, jitterVars[key]);
        }
      }

      box.classList.remove("wipe-in");
      box.classList.add("wipe-out");
    });

    box.addEventListener("animationend", (e) => {
      box.classList.remove("wipe-in");
      box.classList.remove("wipe-out");
    });
  });
});
