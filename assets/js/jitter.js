document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    const box = link.querySelector(".highlight-box");

    let jitterVars = null;

    link.addEventListener("mouseenter", () => {
      // Generate jitter ONCE
      jitterVars = {
        left: `${Math.random() * 4 - 2}%`,
        bottom: `${Math.random() * 4 - 2}%`,
        width: `${100 + Math.random() * 6}%`,
        rotate: `${(Math.random() - 0.5) * 3}deg`
      };

      for (const key in jitterVars) {
        box.style.setProperty(`--jitter-${key}`, jitterVars[key]);
      }

      box.style.opacity = "1"; // Stay visible after animation
      box.classList.remove("wipe-out");
      box.classList.add("wipe-in");
    });

    link.addEventListener("mouseleave", () => {
      if (jitterVars) {
        for (const key in jitterVars) {
          box.style.setProperty(`--jitter-${key}`, jitterVars[key]);
        }
      }

      box.classList.remove("wipe-in");
      box.classList.add("wipe-out");
    });

    box.addEventListener("animationend", (e) => {
      if (e.animationName === "wipe-in") {
        box.classList.remove("wipe-in");
        box.style.opacity = "1"; // Keep it visible
      }

      if (e.animationName === "wipe-out") {
        box.classList.remove("wipe-out");
        box.style.opacity = "0"; // Hide it after wipe-out
      }
    });
  });
});

