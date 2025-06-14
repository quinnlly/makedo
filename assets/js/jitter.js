document.addEventListener("DOMContentLoaded", () => {
  const zones = document.querySelectorAll(".hover-zone");

  zones.forEach(zone => {
    const box = zone.querySelector(".highlight-box");
    let jitter = {};

    zone.addEventListener("mouseenter", () => {
      const existingEraser = zone.querySelector(".eraser-box");
      if (existingEraser) {
        existingEraser.remove(); // 🛡 prevent overlap
      }

      box.classList.remove("wipe-in", "wipe-in-slow");
      void box.offsetWidth;

      jitter = {
        left: `${Math.random() * 2}%`,
        bottom: `${Math.random() * 4 - 2}%`,
        width: `${100 + Math.random() * 6}%`,
        rotate: `${(Math.random() - 0.5) * 3}deg`
      };

      for (const key in jitter) {
        box.style.setProperty(`--jitter-${key}`, jitter[key]);
      }

      box.classList.add("wipe-in");
      box.style.opacity = "1";
    });

    zone.addEventListener("mouseleave", () => {
      const parentDropdown = zone.closest(".has-dropdown");
      if (parentDropdown?.classList.contains("open") && clickedOpen) return;

      const existingEraser = zone.querySelector(".eraser-box");
      if (existingEraser) existingEraser.remove(); // 🛡

      const eraser = document.createElement("div");
      eraser.classList.add("eraser-box", "eraser-slide");

      eraser.style.left = box.style.left;
      eraser.style.bottom = box.style.bottom;
      eraser.style.width = `${box.getBoundingClientRect().width}px`;
      eraser.style.top = "-25%";
      eraser.style.height = "200%";

      zone.appendChild(eraser);

      eraser.addEventListener("animationend", () => {
        box.classList.remove("wipe-in", "wipe-in-slow");
        box.style.opacity = "0";
        eraser.remove();

        if (zone.matches(":hover")) {
          box.classList.remove("wipe-in", "wipe-in-slow");
          void box.offsetWidth;

          const jitter = {
            left: `${Math.random() * 2}%`,
            bottom: `${Math.random() * 4 - 2}%`,
            width: `${100 + Math.random() * 6}%`,
            rotate: `${(Math.random() - 0.5) * 3}deg`
          };

          for (const key in jitter) {
            box.style.setProperty(`--jitter-${key}`, jitter[key]);
          }

          box.classList.add("wipe-in-slow");
          box.style.opacity = "1";
        }
      });
    });
  });

  // ▼ Projects dropdown behavior
  const dropdown = document.querySelector(".has-dropdown");
  const trigger = dropdown?.querySelector(".dropdown-trigger");
  const arrow = dropdown?.querySelector(".dropdown-arrow");
  const highlightBox = trigger?.querySelector(".highlight-box");

  let clickedOpen = false;

  if (dropdown && trigger && arrow && highlightBox) {
    const showHighlight = () => {
      highlightBox.classList.add("wipe-in");
      highlightBox.style.opacity = "1";
    };

    const wipeOut = () => {
      const existing = trigger.querySelector(".eraser-box");
      if (existing) existing.remove(); // 🛡

      const eraser = document.createElement("div");
      eraser.classList.add("eraser-box", "eraser-slide");

      eraser.style.left = highlightBox.style.left;
      eraser.style.bottom = highlightBox.style.bottom;
      eraser.style.width = `${highlightBox.getBoundingClientRect().width}px`;
      eraser.style.top = "-25%";
      eraser.style.height = "200%";

      trigger.appendChild(eraser);

      eraser.addEventListener("animationend", () => {
        highlightBox.classList.remove("wipe-in", "wipe-in-slow");
        highlightBox.style.opacity = "0";
        eraser.remove();
      });
    };

    const toggleDropdown = (e) => {
      e.preventDefault();
      clickedOpen = !clickedOpen;
      dropdown.classList.toggle("open", clickedOpen);

      if (clickedOpen) {
        showHighlight();
      } else {
        wipeOut();
      }
    };

    [trigger, arrow].forEach(el => {
      el.addEventListener("click", toggleDropdown);
      el.addEventListener("mouseenter", () => {
        if (!clickedOpen) {
          dropdown.classList.add("open");
          showHighlight();
        }
      });
    });

    dropdown.addEventListener("mouseleave", () => {
      if (!clickedOpen) {
        dropdown.classList.remove("open");
        wipeOut();
      }
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        clickedOpen = false;
        dropdown.classList.remove("open");
        wipeOut();
      }
    });
  }
});
