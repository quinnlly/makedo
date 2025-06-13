// jittered blue-bar hover effect with paper-texture wipe-out
document.addEventListener("DOMContentLoaded", () => {

  const ERASE_MS = 400;           // matches .38 s overlay slide in CSS
  document.querySelectorAll(".hover-zone").forEach(zone => {

    const box = zone.querySelector(".highlight-box");
    let eraseTimer = null;

    /* --- helper: random jitter values --- */
    function jitter () {
      box.style.setProperty("--jitter-left" , `${Math.random()*4 - 2}%`);
      box.style.setProperty("--jitter-bottom", `${Math.random()*4 - 2}%`);
      box.style.setProperty("--jitter-width" , `${100 + Math.random()*6}%`);
      box.style.setProperty("--jitter-rotate", `${(Math.random()-0.5)*3}deg`);
    }

    /* --- mouseenter: wipe-IN --- */
    zone.addEventListener("mouseenter", () => {
      clearTimeout(eraseTimer);                      // cancel pending reset
      box.classList.remove("erase","wipe-in","wipe-in-slow");
      void box.offsetWidth;                          // restart animations
      jitter();
      box.classList.add("wipe-in");                  // blue bar scales in
      box.style.opacity = "1";
    });

    /* --- mouseleave: start erase overlay --- */
    zone.addEventListener("mouseleave", () => {
      if (box.classList.contains("erase")) return;   // already erasing
      box.classList.add("erase");                    // add overlay layers
      /* keep .wipe-in so bar stays visible during slide */

      eraseTimer = setTimeout(() => {                // after overlay done…
        box.classList.remove("erase","wipe-in","wipe-in-slow");
        box.style.opacity = "0";
        box.style.transform = "scaleX(0) rotate(var(--jitter-rotate,0deg))";

        /* if pointer re-entered during erase → slow wipe-in */
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
