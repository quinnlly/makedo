document.addEventListener("DOMContentLoaded", () => {
  const zones = document.querySelectorAll(".hover-zone");
  let dropdownCloseTimeout = null;

  const randSkew = (magnitude) => {
    const sign = Math.random() < 0.5 ? -1 : 1;
    return sign * Math.pow(Math.random(), 0.5) * magnitude;
  };

  zones.forEach(zone => {
    const box = zone.querySelector(".highlight-box");
    let eraserBox = null;

    zone.addEventListener("mouseenter", () => {
      const parentDropdown = zone.closest(".has-dropdown");
      if (parentDropdown?.classList.contains("open")) return;

      if (eraserBox) {
        eraserBox.remove();
        eraserBox = null;
      }

      box.classList.remove("wipe-in", "wipe-in-slow");
      void box.offsetWidth;

      const jitter = {
        left: `${randSkew(2)}%`,
        bottom: `${randSkew(2)}%`,
        width: `${100 + randSkew(10)}%`,
        rotate: `${randSkew(3)}deg`
      };

      for (const key in jitter) {
        box.style.setProperty(`--jitter-${key}`, jitter[key]);
      }

      box.classList.add("wipe-in");
      box.style.opacity = "1";
    });

    zone.addEventListener("mouseleave", () => {
      const parentDropdown = zone.closest(".has-dropdown");

      if (parentDropdown?.classList.contains("open") || zone.matches(':hover')) return;

      if (eraserBox) {
        eraserBox.remove();
        eraserBox = null;
      }

      eraserBox = document.createElement("div");
      eraserBox.classList.add("eraser-box", "eraser-slide");

      eraserBox.style.left = box.style.left;
      eraserBox.style.bottom = box.style.bottom;
      eraserBox.style.width = `${box.getBoundingClientRect().width}px`;
      eraserBox.style.top = "-25%";
      eraserBox.style.height = "200%";

      zone.appendChild(eraserBox);

      eraserBox.addEventListener("animationend", () => {
        box.classList.remove("wipe-in", "wipe-in-slow");
        box.style.opacity = "0";
        if (eraserBox) eraserBox.remove();
        eraserBox = null;

        if (zone.matches(":hover")) {
          box.classList.remove("wipe-in", "wipe-in-slow");
          void box.offsetWidth;

          const jitter = {
            left: `${randSkew(2)}%`,
            bottom: `${randSkew(2)}%`,
            width: `${100 + randSkew(10)}%`,
            rotate: `${randSkew(3)}deg`
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
  let highlightLocked = false;
  let eraserBox = null;

  if (dropdown && trigger && arrow && highlightBox) {
    const showHighlight = () => {
      if (highlightLocked) return;

      if (eraserBox) {
        eraserBox.remove();
        eraserBox = null;
      }

      highlightBox.classList.remove("wipe-in", "wipe-in-slow");
      void highlightBox.offsetWidth;

      const jitter = {
        left: `${randSkew(2)}%`,
        bottom: `${randSkew(2)}%`,
        width: `${100 + randSkew(10)}%`,
        rotate: `${randSkew(3)}deg`
      };

      for (const key in jitter) {
        highlightBox.style.setProperty(`--jitter-${key}`, jitter[key]);
      }

      highlightBox.classList.add("wipe-in");
      highlightBox.style.opacity = "1";
      highlightLocked = true;
    };

    const wipeOut = () => {
      highlightLocked = false;

      if (eraserBox) {
        eraserBox.remove();
        eraserBox = null;
      }

      eraserBox = document.createElement("div");
      eraserBox.classList.add("eraser-box", "eraser-slide");

      eraserBox.style.left = highlightBox.style.left;
      eraserBox.style.bottom = highlightBox.style.bottom;
      eraserBox.style.width = `${highlightBox.getBoundingClientRect().width}px`;
      eraserBox.style.top = "-25%";
      eraserBox.style.height = "200%";

      trigger.appendChild(eraserBox);

      eraserBox.addEventListener("animationend", () => {
        highlightBox.classList.remove("wipe-in", "wipe-in-slow");
        highlightBox.style.opacity = "0";
        if (eraserBox) eraserBox.remove();
        eraserBox = null;
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

    dropdown.addEventListener("mouseenter", () => {
      if (dropdownCloseTimeout) {
        clearTimeout(dropdownCloseTimeout);
        dropdownCloseTimeout = null;
      }

      if (!clickedOpen) {
        dropdown.classList.add("open");
        showHighlight();
      }
    });

    [trigger, arrow].forEach(el => {
      el.addEventListener("click", toggleDropdown);
    });

    dropdown.addEventListener("mouseleave", () => {
      if (clickedOpen) return;

      dropdownCloseTimeout = setTimeout(() => {
        dropdown.classList.remove("open");
        wipeOut();
      }, 150);
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        clickedOpen = false;
        dropdown.classList.remove("open");
        wipeOut();
      }
    });

    const projectsHoverZone = trigger.querySelector(".hover-zone");
    if (projectsHoverZone) {
      projectsHoverZone.addEventListener("mouseenter", () => {
        if (dropdown.classList.contains("open") && !highlightLocked) {
          showHighlight();
        }
      });
    }
  }
});
