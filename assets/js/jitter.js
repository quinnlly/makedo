// jittered blue bar with visible left-to-right wipe-out
document.addEventListener("DOMContentLoaded", () => {

  const ERASE_MS = 600;          // overlay slide time (.60 s in CSS)

  document.querySelectorAll(".hover-zone").forEach(zone => {
    const bar = zone.querySelector(".highlight-box");
    let eraseTimer = null;

    function jitter () {
      bar.style.setProperty("--jitter-left" , `${Math.random()*4 - 2}%`);
      bar.style.setProperty("--jitter-bottom", `${Math.random()*4 - 2}%`);
      bar.style.setProperty("--jitter-width" , `${100 + Math.random()*6}%`);
      bar.style.setProperty("--jitter-rotate", `${(Math.random()-0.5)*3}deg`);
    }

    /* ───── hover IN ───────────────────────────────────── */
    zone.addEventListener("mouseenter", () => {
      clearTimeout(eraseTimer);
      bar.classList.remove("erase","wipe-in","wipe-in-slow");
      bar.style.transform = "";          // release forced scale
      void bar.offsetWidth;
      jitter();
      bar.classList.add("wipe-in");
      bar.style.opacity = "1";
    });

    /* ───── hover OUT ─────────────────────────────────── */
    zone.addEventListener("mouseleave", () => {
      if (bar.classList.contains("erase")) return;   // already erasing

      /* keep bar fully visible: force scaleX(1) inline */
      bar.style.transform =
        `scaleX(1) rotate(var(--jitter-rotate,0deg))`;

      bar.classList.add("erase");                    // overlay slides

      eraseTimer = setTimeout(() => {                // after slide ends
        bar.classList.remove("erase","wipe-in","wipe-in-slow");
        bar.style.opacity   = "0";
        bar.style.transform = "scaleX(0) rotate(var(--jitter-rotate,0deg))";

        /* if pointer re-entered during erase → slow wipe-in */
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
