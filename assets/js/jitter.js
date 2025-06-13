// jittered blue bar with sliding paper overlay wipe-out
document.addEventListener("DOMContentLoaded", () => {

  const ERASE_MS = 600;                       // 0.60 s slide matches CSS
  document.querySelectorAll(".hover-zone").forEach(zone => {
    const bar = zone.querySelector(".highlight-box");
    let timer = null;

    /* random jitter on every hover */
    function jitter () {
      bar.style.setProperty("--jitter-left" , `${Math.random()*4 - 2}%`);
      bar.style.setProperty("--jitter-bottom", `${Math.random()*4 - 2}%`);
      bar.style.setProperty("--jitter-width" , `${100 + Math.random()*6}%`);
      bar.style.setProperty("--jitter-rotate", `${(Math.random()-0.5)*3}deg`);
    }

    /* hover IN */
    zone.addEventListener("mouseenter", () => {
      clearTimeout(timer);
      bar.classList.remove("erase","wipe-in","wipe-in-slow");
      void bar.offsetWidth;          // restart animation
      jitter();
      bar.classList.add("wipe-in");
      bar.style.opacity = "1";
    });

    /* hover OUT */
    zone.addEventListener("mouseleave", () => {
      if (bar.classList.contains("erase")) return;   // already erasing
      bar.classList.add("erase");                    // overlay slides

      /* remove overlay & reset after slide finishes */
      timer = setTimeout(() => {
        bar.classList.remove("erase","wipe-in","wipe-in-slow");
        bar.style.opacity = "0";
        bar.style.transform = "scaleX(0) rotate(var(--jitter-rotate))";

        /* if pointer re-entered meanwhile → slow wipe-in */
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
