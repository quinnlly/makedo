// jittered blue-bar hover effect with built-in left-to-right eraser
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".hover-zone").forEach(zone => {
    const box = zone.querySelector(".highlight-box");

    /* helper to randomise jitter variables */
    function applyJitter () {
      box.style.setProperty("--jitter-left" , `${Math.random() * 4 - 2}%`);
      box.style.setProperty("--jitter-bottom", `${Math.random() * 4 - 2}%`);
      box.style.setProperty("--jitter-width" , `${100 + Math.random() * 6}%`);
      box.style.setProperty("--jitter-rotate", `${(Math.random() - 0.5) * 3}deg`);
    }

    /* ─── mouse enter: show blue bar ────────────────────── */
    zone.addEventListener("mouseenter", () => {
      box.classList.remove("erase", "wipe-in", "wipe-in-slow");
      void box.offsetWidth;              // force reflow
      applyJitter();
      box.classList.add("wipe-in");
    });

    /* ─── mouse leave: slide paper overlay to erase ────── */
    zone.addEventListener("mouseleave", () => {
      box.classList.remove("wipe-in", "wipe-in-slow");
      box.classList.add("erase");        // adds ::after overlay

      /* after eraser animation finishes … */
      box.addEventListener("animationend", function done (e) {
        if (e.animationName !== "eraserSlide") return;  // ignore others
        box.removeEventListener("animationend", done);

        box.classList.remove("erase");
        box.style.opacity = "0";         // hide until next hover

        /* if cursor already back inside, start slow wipe-in */
        if (zone.matches(":hover")) {
          void box.offsetWidth;
          applyJitter();
          box.classList.add("wipe-in-slow");
        }
      }, { once: true });
    });
  });

});
