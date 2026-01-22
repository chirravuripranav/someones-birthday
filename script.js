gsap.registerPlugin(ScrollTrigger);

const revealBtn = document.getElementById("reveal-btn");
const bgMusic = document.getElementById("bg-music");
const storyBtn = document.getElementById("storyBtn");
const moonBtn = document.getElementById("moonBtn");

const hero = document.getElementById("home");
const traitsSec = document.getElementById("traits-section");
const intermission = document.getElementById("intermission");
const giftsContainer = document.getElementById("gifts-container");
const storySection = document.getElementById("story");
const moonPage = document.getElementById("moon-page");
const navHome = document.getElementById("nav-home");

revealBtn.addEventListener("click", () => {
  bgMusic.play().catch(e => console.log("Audio play blocked"));
  document.getElementById("reveal-btn").classList.add("hidden");
  document.getElementById("loader-text").classList.remove("hidden");
  setTimeout(() => {
    gsap.to("#reveal-overlay", { opacity: 0, duration: 1.5, onComplete: () => { 
      document.getElementById("reveal-overlay").style.display = "none"; 
    }});
  }, 3000);
});

// ANIMATE TRAITS IMAGE
gsap.from(".traits-img", {
  opacity: 0,
  scale: 0.85,
  duration: 1.8,
  scrollTrigger: {
    trigger: ".traits-section",
    start: "top 70%",
    toggleActions: "play none none reverse"
  }
});

gsap.to("#fade-text", {
  opacity: 1, y: -30, duration: 2,
  scrollTrigger: { trigger: ".intermission", start: "top 50%", toggleActions: "play none none reverse" }
});

storyBtn.addEventListener("click", () => {
  gsap.to([hero, traitsSec, intermission, giftsContainer], { opacity: 0, duration: 0.6, onComplete: () => {
    [hero, traitsSec, intermission, giftsContainer].forEach(el => el.classList.add("hidden"));
    storySection.classList.remove("hidden");
    loadStory(); window.scrollTo(0,0);
    gsap.fromTo(storySection, { opacity: 0 }, { opacity: 1, duration: 1 });
  }});
});

moonBtn.addEventListener("click", () => {
  gsap.to([hero, traitsSec, intermission, giftsContainer], { opacity: 0, duration: 0.6, onComplete: () => {
    [hero, traitsSec, intermission, giftsContainer].forEach(el => el.classList.add("hidden"));
    moonPage.classList.remove("hidden");
    window.scrollTo(0,0);
    gsap.fromTo(moonPage, { opacity: 0 }, { opacity: 1, duration: 1 });
  }});
});

navHome.addEventListener("click", () => {
  [storySection, moonPage].forEach(el => el.classList.add("hidden"));
  [hero, traitsSec, intermission, giftsContainer].forEach(el => el.classList.remove("hidden"));
  gsap.to([hero, traitsSec, intermission, giftsContainer], { opacity: 1, duration: 0.6 });
  window.scrollTo(0,0);
});

function loadStory() {
  const container = document.getElementById("storyContainer");
  if (container.children.length > 0) return;
  for (let i = 1; i <= 52; i++) {
    const p = document.createElement("div"); p.className = "panel";
    const img = document.createElement("img");
    img.src = `images/story/panel${String(i).padStart(2, "0")}.png`;
    
    p.appendChild(img); container.appendChild(p);
    gsap.from(img, { opacity: 0, y: 20, scrollTrigger: { trigger: p, start: "top 85%" } });
  }
}
