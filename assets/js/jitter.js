// jittered blue bar with timed left-to-right erase
document.addEventListener("DOMContentLoaded", () => {

  const ERASE_MS = 400;           // match .38 s in CSS

  document.querySelectorAll(".hover-zone").forEach(zone => {
    const box = zone.querySelector(".highlight-box");
    let eraseTimer = null;

    /* randomise jitter variables */
    function jitter () {
      box.style.setProperty("--jitter-left" , `${Math.random()*4 - 2}%`);
      box.style.setProperty("--jitter-bottom", `${Math.random()*4 - 2}%`);
      box.style.setProperty("--jitter-width" , `${100 + Math.random()*6}%`);
      box.style.setProperty("--jitter-rotate", `${(Math.random()-0.5)*3}deg`);
    }

    /* mouse enter  ─────────────────────── */
    zone.addEventListener("mouseenter", () => {
      clearTimeout(eraseTimer);
      box.classList.remove("erase","wipe-in","wipe-in-slow");
      void box.offsetWidth;          // restart animation
      jitter();
      box.classList.add("wipe-in");
      box.style.opacity = "1";
    });

    /* mouse leave  ─────────────────────── */
    zone.addEventListener("mouseleave", () => {
      if (box.classList.contains("erase")) return;   // already erasing
      box.classList.add("erase");                    // overlay slides
      /* keep .wipe-in so blue bar stays visible */

      eraseTimer = setTimeout(() => {
        box.classList.remove("erase","wipe-in","wipe-in-slow");
        box.style.opacity = "0";
        box.style.transform = "scaleX(0) rotate(var(--jitter-rotate,0deg))";

        // if pointer re-entered meanwhile, start slow wipe-in
        if (zone.matches(":hover")){
          void box.offsetWidth;
          jitter();
          box.classList.add("wipe-in-slow");
          box.style.opacity = "1";
        }
      }, ERASE_MS);
    });
  });

});
