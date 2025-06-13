// jittered blue bar with left-to-right eraser overlay
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".hover-zone").forEach(zone => {
    const box = zone.querySelector(".highlight-box");

    /* randomise jitter vars */
    function applyJitter () {
      box.style.setProperty("--jitter-left" , `${Math.random()*4 - 2}%`);
      box.style.setProperty("--jitter-bottom", `${Math.random()*4 - 2}%`);
      box.style.setProperty("--jitter-width" , `${100 + Math.random()*6}%`);
      box.style.setProperty("--jitter-rotate", `${(Math.random()-0.5)*3}deg`);
    }

    /* ── mouse enter ─────────────────────────────── */
    zone.addEventListener("mouseenter", () => {
      box.classList.remove("erase");        // ensure clean slate
      void box.offsetWidth;                 // restart any anim
      applyJitter();
      box.classList.remove("wipe-in-slow"); // in case of re-hover
      box.classList.add("wipe-in");
    });

    /* ── mouse leave ─────────────────────────────── */
    zone.addEventListener("mouseleave", () => {
      /* leave wipe-in class ON so opacity stays 1 */
      box.classList.add("erase");           // adds ::after overlay

      /* after overlay finishes sliding … */
      box.addEventListener("animationend", function done (e){
        if(e.animationName!=="eraserSlide") return;
        box.removeEventListener("animationend", done);

        /* reset for next hover */
        box.classList.remove("erase","wipe-in","wipe-in-slow");
        box.style.opacity = "0";            // hide until next hover
        box.style.transform = "scaleX(0) rotate(var(--jitter-rotate,0deg))";

        /* if pointer already back, start slow wipe-in */
        if(zone.matches(":hover")){
          void box.offsetWidth;
          applyJitter();
          box.classList.add("wipe-in-slow");
        }
      }, { once:true });
    });
  });

});
