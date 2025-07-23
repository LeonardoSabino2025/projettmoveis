// carousel.js (modificado)
export function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevThumb = document.querySelector('.prev-thumb');
  const nextThumb = document.querySelector('.next-thumb');

  let currentSlide = 0;

  function getBackgroundUrl(el) {
    const bg = getComputedStyle(el).backgroundImage;
    return bg.slice(4, -1).replace(/"/g, "");
  }

  function showSlide(index) {
    index = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === (index % dots.length));
    });

    currentSlide = index;
    updateNavigationPreviews();
  }

  function updateNavigationPreviews() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    const nextIndex = (currentSlide + 1) % slides.length;

    const prevUrl = getBackgroundUrl(slides[prevIndex]);
    const nextUrl = getBackgroundUrl(slides[nextIndex]);

    if (prevThumb) prevThumb.style.backgroundImage = `url('${prevUrl}')`;
    if (nextThumb) nextThumb.style.backgroundImage = `url('${nextUrl}')`;
  }

  document.querySelector('.prev-slide')?.addEventListener('click', () => showSlide(currentSlide - 1));
  document.querySelector('.next-slide')?.addEventListener('click', () => showSlide(currentSlide + 1));

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  setInterval(() => showSlide(currentSlide + 1), 5000);

  showSlide(currentSlide);
  updateNavigationPreviews();
}