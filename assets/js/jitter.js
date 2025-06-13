// jittered blue bar using clip-path wipe-in / wipe-out
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".hover-zone").forEach(zone => {
    const bar = zone.querySelector(".highlight-box");

    /* ── helper: randomise jitter on every hover ── */
    function jitter () {
      bar.style.setProperty("--jitter-left" , `${Math.random()*4 - 2}%`);
      bar.style.setProperty("--jitter-bottom", `${Math.random()*4 - 2}%`);
      bar.style.setProperty("--jitter-width" , `${100 + Math.random()*6}%`);
      bar.style.setProperty("--jitter-rotate", `${(Math.random()-0.5)*3}deg`);
      bar.style.transform = `rotate(var(--jitter-rotate))`;
    }

    /* ── hover IN: reveal with wipe-in clip ── */
    zone.addEventListener("mouseenter", () => {
      bar.classList.remove("wipe-out","wipe-in","wipe-in-slow");
      void bar.offsetWidth;                // restart animations
      jitter();
      bar.classList.add("wipe-in");
    });

    /* ── hover OUT: hide with wipe-out clip ── */
    zone.addEventListener("mouseleave", () => {
      bar.classList.remove("wipe-in","wipe-in-slow");
      bar.classList.add("wipe-out");
      /* remove wipe-out when it finishes so next hover starts clean */
      bar.addEventListener("animationend", function done(e){
        if (e.animationName !== "wipeOutClip") return;
        bar.classList.remove("wipe-out");
        bar.removeEventListener("animationend", done);
      }, { once:true });
    });
  });

});
