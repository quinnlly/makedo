// Load nav-bar.html and THEN bind logic
document.addEventListener("DOMContentLoaded", () => {
  fetch('nav-bar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('nav-placeholder').innerHTML = html;
      initNavBarBehavior(); // ⬅️ run this AFTER injection
    });
});

function initNavBarBehavior() {
  const hoverZones = document.querySelectorAll(".hover-zone");
  const dropdownTriggers = document.querySelectorAll(".dropdown-trigger");
  const dropdowns = document.querySelectorAll(".has-dropdown");

  hoverZones.forEach((zone) => {
    const highlight = zone.querySelector(".highlight-box");
    if (!highlight) return;

    zone.addEventListener("mouseenter", () => {
      highlight.classList.remove("wipe-in", "wipe-in-slow");
      void highlight.offsetWidth;
      highlight.classList.add("wipe-in");
    });

    zone.addEventListener("mouseleave", () => {
      const eraser = document.createElement("div");
      eraser.classList.add("eraser-box", "eraser-slide-fast");
      zone.appendChild(eraser);

      eraser.addEventListener("animationend", () => {
        eraser.remove();
      });
    });
  });

  dropdownTriggers.forEach((trigger) => {
    const parent = trigger.closest(".has-dropdown");
    if (!parent) return;

    trigger.addEventListener("click", () => {
      parent.classList.toggle("open");
    });
  });

  document.addEventListener("click", (e) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  });
}
