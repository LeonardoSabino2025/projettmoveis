// assets/js/main.js

import { initCarousel } from './carousel.js'; // Importa a função do carrossel

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o carrossel quando o DOM estiver pronto
    initCarousel();

  // CÓDIGO PARA O ÍCONE ANIMADO DO WHATSAPP COM LOTTIE
  const animationContainer = document.getElementById('whatsapp-animation-container');

  if (animationContainer) {
    lottie.loadAnimation({
      container: animationContainer, // O elemento DOM que conterá a animação
      renderer: 'svg', // Tipo de renderização: 'svg' é geralmente o melhor para qualidade
      loop: true, // A animação vai repetir em loop
      autoplay: true, // A animação vai começar automaticamente
      path: 'assets/js/whatsapp.json', // Caminho para o seu arquivo JSON de animação
    });
  }
    // CÓDIGO PARA CONTROLAR A VISIBILIDADE DO BOTÃO DO WHATSAPP NA ROLAGEM
  const whatsappButton = document.querySelector('.whatsapp-float');
  const heroSection = document.querySelector('.hero-section'); // Seleciona sua seção hero

  if (whatsappButton && heroSection) {
    const handleScroll = () => {
      // Pega a altura da seção hero (pode ajustar o valor -100 para aparecer um pouco antes/depois)
      const heroHeight = heroSection.offsetHeight; 

      // Verifica se o usuário rolou a página além da altura da seção hero
      if (window.scrollY > heroHeight - 100) { // O -100 faz com que ele apareça 100px antes do fim da hero
        whatsappButton.classList.add('show-whatsapp');
      } else {
        whatsappButton.classList.remove('show-whatsapp');
      }
    };

    // Adiciona o event listener para o evento de rolagem
    window.addEventListener('scroll', handleScroll);

    // Chama a função uma vez no carregamento da página para verificar a posição inicial
    handleScroll();
  }
});
