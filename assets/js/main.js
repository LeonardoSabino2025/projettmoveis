// assets/js/main.js

import { initCarousel } from './carousel.js';
import { initWhatsappLogic } from './whatsapp-animation.js'; 
import { initVideoPlayers } from './play_video.js';
import { initLiquidNavBar } from './liquid-navbar.js';

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initWhatsappLogic();
    initVideoPlayers();
    initLiquidNavBar();

  
  // Lógica do menu hambúrguer
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.main-nav');
    const navLinks = navMenu.querySelectorAll('a'); // Seleciona todos os links do menu

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Adiciona um listener para fechar o menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Código para carregamento da seção "Sobre Nós" (mantido)
    fetch("about-us-section.html")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("about-us-section-placeholder").innerHTML =
          html;
        const videoInLoadedSection =
          document.getElementById("aboutUsVideo");
        if (videoInLoadedSection) {
          videoInLoadedSection.classList.add("active");
          videoInLoadedSection.play().catch((error) => {
            console.warn(
              "Vídeo não pode ser reproduzido automaticamente:",
              error
            );
          });
        }
      });
});