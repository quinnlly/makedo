// jittered blue bar with true left-to-right erase
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".hover-zone").forEach(zone => {
    const bar = zone.querySelector(".highlight-box");

    /* helper: randomise jitter each wipe-in */
    function jitter () {
      bar.style.setProperty("--jitter-left" , `${Math.random()*4 - 2}%`);
      bar.style.setProperty("--jitter-bottom", `${Math.random()*4 - 2}%`);
      bar.style.setProperty("--jitter-width" , `${100 + Math.random()*6}%`);
      bar.style.setProperty("--jitter-rotate", `${(Math.random()-0.5)*3}deg`);
    }

    /* ── hover IN ───────────────────────────────────────── */
    zone.addEventListener("mouseenter", () => {
      bar.classList.remove("erase","wipe-in","wipe-in-slow");
      void bar.offsetWidth;                 // restart animations
      jitter();
      bar.classList.add("wipe-in");         // blue bar scales in
      bar.style.opacity = "1";
    });

    /* ── hover OUT ──────────────────────────────────────── */
    zone.addEventListener("mouseleave", () => {
      if (bar.classList.contains("erase")) return;  // already erasing

      bar.classList.add("erase");   // add overlay layers
      /* keep .wipe-in so bar stays visible */

      /* wait for overlay's slide to finish */
      bar.addEventListener("animationend", function done (e) {
        if (e.animationName !== "eraserSlide") return; // ignore wipeIn
        bar.removeEventListener("animationend", done);

        bar.classList.remove("erase","wipe-in","wipe-in-slow");
        bar.style.opacity = "0";
        bar.style.transform = "scaleX(0) rotate(var(--jitter-rotate,0deg))";

        /* if pointer re-entered during erase → slow wipe-in */
        if (zone.matches(":hover")){
          void bar.offsetWidth;
          jitter();
          bar.classList.add("wipe-in-slow");
          bar.style.opacity = "1";
        }
      }, { once:true });
    });
  });

});

