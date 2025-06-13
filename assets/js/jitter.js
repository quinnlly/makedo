document.addEventListener("DOMContentLoaded", () => {
  const zones = document.querySelectorAll(".hover-zone");

  zones.forEach(zone => {
    const box = zone.querySelector(".highlight-box");
    let jitter = {};

    zone.addEventListener("mouseenter", () => {
      const existingEraser = zone.querySelector(".eraser-box");

      if (existingEraser) {
        existingEraser.classList.add("eraser-slide-fast");
        return;
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

          jitter = {
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

  // Dropdown logic
  const dropdown = document.querySelector(".has-dropdown");
  const trigger = dropdown?.querySelector(".dropdown-trigger");
  const arrow = dropdown?.querySelector(".dropdown-arrow");
  const highlightBox = trigger?.querySelector(".highlight-box");

  let clickedOpen = false;

  if (dropdown && trigger && arrow && highlightBox) {
    // Hover behavior
    const openHover = () => {
      if (!clickedOpen) {
        dropdown.classList.add("open");
        highlightBox.classList.add("wipe-in");
        highlightBox.style.opacity = "1";
      }
    };

    const closeHover = () => {
      if (!clickedOpen) {
        dropdown.classList.remove("open");
        highlightBox.classList.remove("wipe-in", "wipe-in-slow");
        highlightBox.style.opacity = "0";
      }
    };

    dropdown.addEventListener("mouseenter", openHover);
    dropdown.addEventListener("mouseleave", closeHover);

    // Toggle lock on click
    const toggleDropdown = (e) => {
      e.preventDefault();
      clickedOpen = !clickedOpen;
      dropdown.classList.toggle("open", clickedOpen);

      if (clickedOpen) {
        highlightBox.classList.add("wipe-in");
        highlightBox.style.opacity = "1";
      } else {
        highlightBox.classList.remove("wipe-in", "wipe-in-slow");
        highlightBox.style.opacity = "0";
      }
    };

    trigger.addEventListener("click", toggleDropdown);
    arrow.addEventListener("click", toggleDropdown);

    // Click outside to close
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        clickedOpen = false;
        dropdown.classList.remove("open");
        highlightBox.classList.remove("wipe-in", "wipe-in-slow");
        highlightBox.style.opacity = "0";
      }
    });
  }
});
