// jittered blue bar with left-to-right paper-texture erase
document.addEventListener("DOMContentLoaded", () => {

  const ERASE_MS = 600;   // must match .60s overlay slide in CSS
  document.querySelectorAll(".hover-zone").forEach(zone => {

    const bar = zone.querySelector(".highlight-box");
    let eraseTimer = null;

    function jitter () {
      bar.style.setProperty("--jitter-left" , `${Math.random()*4 - 2}%`);
      bar.style.setProperty("--jitter-bottom", `${Math.random()*4 - 2}%`);
      bar.style.setProperty("--jitter-width" , `${100 + Math.random()*6}%`);
      bar.style.setProperty("--jitter-rotate", `${(Math.random()-0.5)*3}deg`);
    }

    /* hover in */
    zone.addEventListener("mouseenter", () => {
      clearTimeout(eraseTimer);
      bar.classList.remove("erase","wipe-in","wipe-in-slow");
      void bar.offsetWidth;
      jitter();
      bar.classList.add("wipe-in");
      bar.style.opacity = "1";
    });

    /* hover out */
    zone.addEventListener("mouseleave", () => {
      if (bar.classList.contains("erase")) return;   // already erasing
      bar.classList.add("erase");                    // add overlay layers

      eraseTimer = setTimeout(() => {                // after slide ends
        bar.classList.remove("erase","wipe-in","wipe-in-slow");
        bar.style.opacity = "0";
        bar.style.transform = "scaleX(0) rotate(var(--jitter-rotate,0deg))";

        /* re-hovered during wipe-out */
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
