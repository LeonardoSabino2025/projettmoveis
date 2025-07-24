// carousel.js (OTIMIZADO para touch e mobile)
export function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevThumb = document.querySelector('.prev-thumb');
  const nextThumb = document.querySelector('.next-thumb');
  const carouselContainer = document.querySelector('.hero-carousel');

  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0; // Adicionado para detectar movimento vertical
  let touchEndY = 0;
  let isAutoplayActive = true;
  let autoplayInterval;
  let isDragging = false; // Flag para controlar se está arrastando

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

  // Função para parar o autoplay
  function pauseAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  // Função para retomar o autoplay
  function resumeAutoplay() {
    if (isAutoplayActive) {
      pauseAutoplay(); // Limpa qualquer intervalo existente
      autoplayInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    }
  }

  // Event listeners para cliques nas setas (desktop)
  document.querySelector('.prev-slide')?.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    pauseAutoplay();
    setTimeout(resumeAutoplay, 3000); // Retoma após 3 segundos
  });

  document.querySelector('.next-slide')?.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    pauseAutoplay();
    setTimeout(resumeAutoplay, 3000); // Retoma após 3 segundos
  });

  // Event listeners para os pontos (dots)
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      pauseAutoplay();
      setTimeout(resumeAutoplay, 3000); // Retoma após 3 segundos
    });
  });

  // =======================================================
  // LÓGICA TOUCH OTIMIZADA
  // =======================================================

  if (carouselContainer && 'ontouchstart' in window) {
    // Touch Start
    carouselContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isDragging = true;
      pauseAutoplay(); // Para o autoplay durante o toque
    }, { passive: true });

    // Touch Move - com melhor controle de direção
    carouselContainer.addEventListener('touchmove', (e) => {
      if (!isDragging) return;

      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;
      
      const deltaX = Math.abs(touchCurrentX - touchStartX);
      const deltaY = Math.abs(touchCurrentY - touchStartY);
      
      // Se o movimento horizontal é maior que o vertical, previne scroll
      if (deltaX > deltaY && deltaX > 10) {
        e.preventDefault();
      }
    }, { passive: false });

    // Touch End
    carouselContainer.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleGesture();
      isDragging = false;
      
      // Retoma o autoplay após 2 segundos
      setTimeout(resumeAutoplay, 2000);
    }, { passive: true });

    // Touch Cancel - para casos onde o toque é interrompido
    carouselContainer.addEventListener('touchcancel', () => {
      isDragging = false;
      setTimeout(resumeAutoplay, 2000);
    }, { passive: true });
  }

  function handleGesture() {
    const minSwipeDistance = 50; // Distância mínima para swipe
    const maxVerticalDistance = 100; // Máximo movimento vertical permitido
    
    const horizontalDistance = touchEndX - touchStartX;
    const verticalDistance = Math.abs(touchEndY - touchStartY);
    
    // Só considera swipe se o movimento vertical não for muito grande
    if (verticalDistance > maxVerticalDistance) {
      return; // Ignora se foi um scroll vertical
    }

    if (Math.abs(horizontalDistance) >= minSwipeDistance) {
      if (horizontalDistance < 0) {
        // Swipe para a esquerda (próximo slide)
        showSlide(currentSlide + 1);
      } else {
        // Swipe para a direita (slide anterior)
        showSlide(currentSlide - 1);
      }
    }
  }

  // =======================================================
  // EVENTOS ADICIONAIS PARA MELHOR UX
  // =======================================================

  // Para quando o usuário sai da aba/janela
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseAutoplay();
    } else {
      resumeAutoplay();
    }
  });

  // Para quando o mouse entra/sai do carrossel (desktop)
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', pauseAutoplay);
    carouselContainer.addEventListener('mouseleave', resumeAutoplay);
  }

  // =======================================================
  // INICIALIZAÇÃO
  // =======================================================

  // Inicializa o carrossel
  if (slides.length > 0) {
    showSlide(currentSlide);
    resumeAutoplay(); // Inicia o autoplay
  }

  // Cleanup function (opcional - para SPAs)
  return {
    destroy: () => {
      pauseAutoplay();
      isAutoplayActive = false;
    },
    pause: pauseAutoplay,
    resume: resumeAutoplay,
    goToSlide: showSlide
  };
}