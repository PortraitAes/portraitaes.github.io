const figureSwitchers = document.querySelectorAll("[data-figure-switcher]");

figureSwitchers.forEach((switcher) => {
  const tabs = [...switcher.querySelectorAll("[data-figure-index]")];
  const slides = [...switcher.querySelectorAll(".figure-slide")];

  const select = (index) => {
    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle("is-active", active);
      slide.hidden = !active;
    });
  };

  tabs.forEach((tab, index) => tab.addEventListener("click", () => select(index)));
});

const carousel = document.querySelector("[data-reasoning-carousel]");

if (carousel) {
  const slides = [...carousel.querySelectorAll(".reasoning-slide")];
  const title = carousel.querySelector("[data-carousel-title]");
  const current = carousel.querySelector("[data-carousel-current]");
  let activeIndex = 0;

  const select = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === activeIndex;
      slide.classList.toggle("is-active", active);
      slide.hidden = !active;
    });
    title.textContent = slides[activeIndex].dataset.title;
    current.textContent = String(activeIndex + 1);
  };

  carousel.querySelector("[data-carousel-prev]").addEventListener("click", () => select(activeIndex - 1));
  carousel.querySelector("[data-carousel-next]").addEventListener("click", () => select(activeIndex + 1));
}

const sectionLinks = [...document.querySelectorAll(".site-nav a")];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    sectionLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  }, { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.2, 0.5] });

  observedSections.forEach((section) => observer.observe(section));
}
