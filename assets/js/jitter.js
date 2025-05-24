document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    const box = link.querySelector(".highlight-box");

    // Track jitter state across hover/leave
    let jitterVars = {
      left: "0%",
      bottom: "0%",
      width: "100%",
      rotate: "0deg"
    };

    link.addEventListener("mouseenter", () => {
      // Generate jitter values ONCE
      jitterVars = {
        left: `${(Math.random() - 0.5) * 5}%`,         // -2.5% to +2.5%
        bottom: `${(Math.random() - 0.5) * 5}%`,       // -2.5% to +2.5%
        width: `${100 + Math.random() * 6}%`,          // 100% to 106%
        rotate: `${(Math.random() - 0.5) * 3}deg`       // -1.5 to +1.5 deg
      };

      // Apply jitter CSS variables
      box.style.setProperty('--jitter-left', jitterVars.left);
      box.style.setProperty('--jitter-bottom', jitterVars.bottom);
      box.style.setProperty('--jitter-width', jitterVars.width);
      box.style.setProperty('--jitter-rotate', jitterVars.rotate);

      box.style.transformOrigin = "left center";
      box.classList.remove("wipe-out");
      void box.offsetWidth;
      box.classList.add("wipe-in");
    });

    link.addEventListener("mouseleave", () => {
      // Reapply SAME jitter vars to ensure no jump
      box.style.setProperty('--jitter-left', jitterVars.left);
      box.style.setProperty('--jitter-bottom', jitterVars.bottom);
      box.style.setProperty('--jitter-width', jitterVars.width);
      box.style.setProperty('--jitter-rotate', jitterVars.rotate);

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
