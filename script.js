document.addEventListener("DOMContentLoaded", () => {
  // REGISTER GSAP
  gsap.registerPlugin(ScrollTrigger);

  const giftCards = document.querySelectorAll(".gift-card");
  const storySection = document.querySelector(".story");
  const storyContainer = document.getElementById("storyContainer");
  const allSections = document.querySelectorAll(".section");

  // --------------------
  // LOAD STORY
  // --------------------
  function loadStory() {
    storyContainer.innerHTML = "";

    for (let i = 1; i <= 52; i++) {
      const panel = document.createElement("div");
      panel.className = "panel";

      const img = document.createElement("img");
      img.src = `images/story/panel${String(i).padStart(2, "0")}.png`;
      img.alt = `Panel ${i}`;

      panel.appendChild(img);
      storyContainer.appendChild(panel);
    }

    // Animate story panels AFTER they exist
    animateStoryPanels();
  }

  // --------------------
  // GIFT CLICK
  // --------------------
  giftCards.forEach(card => {
    card.addEventListener("click", () => {
      if (card.dataset.gift === "story") {
        allSections.forEach(sec => sec.classList.add("hidden"));
        storySection.classList.remove("hidden");
        loadStory();
      }
    });
  });

  // --------------------
  // SECTION ANIMATIONS (APPLE-STYLE)
  // --------------------
  gsap.utils.toArray(".section:not(.story)").forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 80,
      scale: 0.95,
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%"
      }
    });
  });

  // --------------------
  // STORY PANEL DEPTH (SAFE)
  // --------------------
  function animateStoryPanels() {
    gsap.utils.toArray(".panel img").forEach(img => {
      gsap.fromTo(
        img,
        { scale: 1.1 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });
  }
});

