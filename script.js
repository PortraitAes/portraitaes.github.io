const carousel = document.querySelector("[data-reasoning-carousel]");

if (carousel) {
  const slides = [...carousel.querySelectorAll(".reasoning-slide")];
  const title = carousel.querySelector("[data-carousel-title]");
  const current = carousel.querySelector("[data-carousel-current]");
  let activeIndex = 0;

  const select = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== activeIndex;
    });
    title.textContent = slides[activeIndex].dataset.title;
    current.textContent = String(activeIndex + 1);
  };

  carousel.querySelector("[data-carousel-prev]").addEventListener("click", () => select(activeIndex - 1));
  carousel.querySelector("[data-carousel-next]").addEventListener("click", () => select(activeIndex + 1));
}
