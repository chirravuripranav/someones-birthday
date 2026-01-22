gsap.registerPlugin(ScrollTrigger);

const revealBtn = document.getElementById("reveal-btn");
const bgMusic = document.getElementById("bg-music");

revealBtn.addEventListener("click", () => {
  bgMusic.play().catch(() => console.log("Music play blocked."));
  gsap.to("#reveal-overlay", { opacity: 0, duration: 1.2, onComplete: () => {
    document.getElementById("reveal-overlay").style.display = "none";
    gsap.from(".reveal-text", { y: 40, opacity: 0, duration: 1, stagger: 0.3 });
  }});
});

function showSection(id) {
  gsap.to("#main-wrapper", { opacity: 0, duration: 0.5, onComplete: () => {
    document.getElementById("main-wrapper").classList.add("hidden");
    const section = document.getElementById(id);
    section.classList.remove("hidden");
    window.scrollTo(0,0);
    gsap.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.8 });

    if(id === 'mirror-page') {
      gsap.from(".trait-node", { scale: 0, opacity: 0, duration: 0.5, stagger: 0.05, ease: "back.out(1.7)" });
    }
  }});
}

function hideSections() {
  document.querySelectorAll(".sub-page").forEach(sec => sec.classList.add("hidden"));
  document.getElementById("main-wrapper").classList.remove("hidden");
  gsap.to("#main-wrapper", { opacity: 1, duration: 0.5 });
  window.scrollTo(0,0);
}

gsap.utils.toArray(".story-block").forEach(block => {
  gsap.from(block, { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: block, start: "top 85%", toggleActions: "play none none reverse" } });
});