// jittered blue bar with pixel-locked wipe-out
document.addEventListener("DOMContentLoaded", () => {

  const ERASE_MS = 600;                     // same as .60 s in CSS

  document.querySelectorAll(".hover-zone").forEach(zone => {
    const bar = zone.querySelector(".highlight-box");
    let eraseTimer = null;

    /* randomise jitter on every wipe-in */
    function jitter () {
      bar.style.setProperty("--jitter-left" , `${Math.random()*4 - 2}%`);
      bar.style.setProperty("--jitter-bottom", `${Math.random()*4 - 2}%`);
      bar.style.setProperty("--jitter-width" , `${100 + Math.random()*6}%`);
      bar.style.setProperty("--jitter-rotate", `${(Math.random()-0.5)*3}deg`);
    }

    /* ── hover IN ───────────────────────────────────────── */
    zone.addEventListener("mouseenter", () => {
      clearTimeout(eraseTimer);
      bar.classList.remove("erase","wipe-in","wipe-in-slow");
      bar.style.width = "";                         // release pixel lock
      void bar.offsetWidth;                         // restart animations
      jitter();
      bar.classList.add("wipe-in");
      bar.style.opacity = "1";
    });

    /* ── hover OUT ──────────────────────────────────────── */
    zone.addEventListener("mouseleave", () => {
      if (bar.classList.contains("erase")) return;  // already erasing

      /* 1️⃣  lock current width so the bar can’t collapse */
      bar.style.width = `${bar.getBoundingClientRect().width}px`;

      /* 2️⃣  remove scaleX so width lock is respected */
      bar.style.transform = `rotate(var(--jitter-rotate,0deg))`;

      bar.classList.add("erase");                   // overlay slides

      eraseTimer = setTimeout(() => {               // after 0.6 s
        bar.classList.remove("erase","wipe-in","wipe-in-slow");
        bar.style.opacity   = "0";
        bar.style.transform = "scaleX(0) rotate(var(--jitter-rotate,0deg))";
        bar.style.width     = "";                   // clear pixel lock

        /* re-hovered during erase → slow wipe-in */
        if (zone.matches(":hover")){
          void bar.offsetWidth;
          jitter();
          bar.classList.add("wipe-in-slow");
          bar.style.opacity = "1";
        }
      }, ERASE_MS);
    });
  });

});
