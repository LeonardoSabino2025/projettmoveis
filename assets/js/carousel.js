// carousel.js (CORRIGIDO para swipe)
export function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevThumb = document.querySelector('.prev-thumb');
  const nextThumb = document.querySelector('.next-thumb');
  const carouselContainer = document.querySelector('.hero-carousel'); // MOVIDO PARA DENTRO DA FUNÇÃO

  let currentSlide = 0;
  let touchStartX = 0; // MOVIDO PARA DENTRO DA FUNÇÃO
  let touchEndX = 0;   // MOVIDO PARA DENTRO DA FUNÇÃO

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

  // Event listeners para cliques nas setas (manter para desktop)
  document.querySelector('.prev-slide')?.addEventListener('click', () => showSlide(currentSlide - 1));
  document.querySelector('.next-slide')?.addEventListener('click', () => showSlide(currentSlide + 1));

  // Event listeners para os pontos (dots)
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  // Autoplay
  setInterval(() => showSlide(currentSlide + 1), 5000);

  // Inicializa o carrossel mostrando o primeiro slide e as prévias
  if (slides.length > 0) { // Adicionado um check para garantir que há slides
      showSlide(currentSlide);
  }
  // updateNavigationPreviews(); // Já é chamado dentro de showSlide

  // =======================================================
  // NOVO: Lógica para arrastar (swipe) em dispositivos touch
  // =======================================================

  // TODO O CÓDIGO ABAIXO FOI MOVIDO PARA DENTRO DE initCarousel()
  carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX; // Pega a posição X do toque inicial
  });

  carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX; // Pega a posição X do toque final
    handleGesture();
  });

  // Opcional: Para evitar rolagem da página enquanto arrasta o carrossel (pode ser útil)
  carouselContainer.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Impede a rolagem padrão da tela durante o arrastar do carrossel
  }, { passive: false }); // Usar { passive: false } para permitir preventDefault

  function handleGesture() { // MOVIDA PARA DENTRO DA FUNÇÃO
    const minSwipeDistance = 50; // Distância mínima em pixels para considerar um swipe

    if (touchEndX < touchStartX - minSwipeDistance) {
      // Swipe para a esquerda (próximo slide)
      showSlide(currentSlide + 1);
    } else if (touchEndX > touchStartX + minSwipeDistance) {
      // Swipe para a direita (slide anterior)
      showSlide(currentSlide - 1);
    }
  }

  // =======================================================
  // FIM da Lógica para arrastar (swipe)
  // =======================================================
}