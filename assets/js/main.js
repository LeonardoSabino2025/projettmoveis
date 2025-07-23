// assets/js/main.js

import { initCarousel } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();

  // CÓDIGO PARA O ÍCONE ANIMADO DO WHATSAPP COM LOTTIE
  const animationContainer = document.getElementById('whatsapp-animation-container');

  if (animationContainer) {
    lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/js/whatsapp.json',
    });
  }
  // CÓDIGO PARA CONTROLAR A VISIBILIDADE DO BOTÃO DO WHATSAPP NA ROLAGEM
  const whatsappButton = document.querySelector('.whatsapp-float');
  const heroSection = document.querySelector('.hero-section');

  if (whatsappButton && heroSection) {
    const handleScroll = () => {
      
      const heroHeight = heroSection.offsetHeight; 

      
      if (window.scrollY > heroHeight - 100) {
        whatsappButton.classList.add('show-whatsapp');
      } else {
        whatsappButton.classList.remove('show-whatsapp');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }
  // NOVO: Lógica do menu hambúrguer
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('main-nav');
    const navLinks = navMenu.querySelectorAll('a'); // Seleciona todos os links do menu

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Opcional: Adicionar um listener para fechar o menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

