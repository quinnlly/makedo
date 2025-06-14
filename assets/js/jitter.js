const hoverZones = document.querySelectorAll(".hover-zone");
const dropdownTriggers = document.querySelectorAll(".dropdown-trigger");
const dropdowns = document.querySelectorAll(".has-dropdown");
  const zones = document.querySelectorAll(".hover-zone");
  let dropdownCloseTimeout = null;

  const randSkew = (magnitude) => {
    const sign = Math.random() < 0.5 ? -1 : 1;
    return sign * Math.pow(Math.random(), 0.5) * magnitude;
  };

  zones.forEach(zone => {
    const box = zone.querySelector(".highlight-box");

    zone.addEventListener("mouseenter", () => {
      const parentDropdown = zone.closest(".has-dropdown");
      if (parentDropdown?.classList.contains("open")) return;

      const existingEraser = zone.querySelector(".eraser-box");
      if (existingEraser) existingEraser.remove();

      box.classList.remove("wipe-in", "wipe-in-slow");
      void box.offsetWidth;

      const jitter = {
        left: `${randSkew(1)}%`,
        bottom: `${randSkew(2)}%`,
        width: `${100 + randSkew(6)}%`,
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

      // ✅ Prevent wipe-out if dropdown is open or user is still hovering
      if (parentDropdown?.classList.contains("open") || zone.matches(':hover')) return;

      const existingEraser = zone.querySelector(".eraser-box");
      if (existingEraser) existingEraser.remove();

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
            left: `${randSkew(1)}%`,
            bottom: `${randSkew(2)}%`,
            width: `${100 + randSkew(6)}%`,
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

  if (dropdown && trigger && arrow && highlightBox) {
    const showHighlight = () => {
      if (highlightLocked) return;

      const existingEraser = trigger.querySelector(".eraser-box");
      if (existingEraser) existingEraser.remove();

      highlightBox.classList.remove("wipe-in", "wipe-in-slow");
      void highlightBox.offsetWidth;

      const jitter = {
        left: `${randSkew(1)}%`,
        bottom: `${randSkew(2)}%`,
        width: `${100 + randSkew(6)}%`,
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

      const existing = trigger.querySelector(".eraser-box");
      if (existing) existing.remove();

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