// jittered blue-bar hover effect with true left-to-right wipe-out
document.addEventListener("DOMContentLoaded", () => {

  const ERASE_MS = 400;                 // overlay slide time (.38 s in CSS)

  document.querySelectorAll(".hover-zone").forEach(zone => {
    const bar = zone.querySelector(".highlight-box");
    let eraseTimer = null;

    /* ── helper: apply random jitter each time we wipe-in ── */
    function jitter () {
      bar.style.setProperty("--jitter-left" , `${Math.random()*4 - 2}%`);
      bar.style.setProperty("--jitter-bottom", `${Math.random()*4 - 2}%`);
      bar.style.setProperty("--jitter-width" , `${100 + Math.random()*6}%`);
      bar.style.setProperty("--jitter-rotate", `${(Math.random()-0.5)*3}deg`);
    }

    /* ── mouseenter → blue bar wipes IN (keeps opacity 1) ── */
    zone.addEventListener("mouseenter", () => {
      clearTimeout(eraseTimer);                               // cancel pending reset
      bar.classList.remove("erase","wipe-in","wipe-in-slow"); // clean state
      void bar.offsetWidth;                                   // restart anims
      jitter();
      bar.classList.add("wipe-in");                           // scale left→right
      bar.style.opacity = "1";
    });

    /* ── mouseleave → add overlay layers, start erase timer ── */
    zone.addEventListener("mouseleave", () => {
      if (bar.classList.contains("erase")) return;            // already erasing

      bar.classList.add("erase");       // adds ::after + ::before overlay
      /* IMPORTANT: leave .wipe-in so bar stays visible */

      eraseTimer = setTimeout(() => {   // after overlay finished sliding
        bar.classList.remove("erase","wipe-in","wipe-in-slow");
        bar.style.opacity  = "0";
        bar.style.transform = "scaleX(0) rotate(var(--jitter-rotate,0deg))";

        /* re-hovered during erase → slow wipe-in */
        if (zone.matches(":hover")) {
          void bar.offsetWidth;         // force reflow
          jitter();
          bar.classList.add("wipe-in-slow");
          bar.style.opacity = "1";
        }
      }, ERASE_MS);
    });
  });

});
