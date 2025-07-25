// assets/js/whatsapp-animation.js

export function initWhatsappLogic() {
  const animationContainer = document.getElementById('whatsapp-animation-container');
  const whatsappButton = document.querySelector('.whatsapp-float');
  const heroSection = document.querySelector('.hero-section'); // Selecionar aqui

  // CÓDIGO PARA O ÍCONE ANIMADO DO WHATSAPP COM LOTTIE
  if (animationContainer) {
    lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/js/whatsapp.json', 
    });
    console.log('Animação Lottie do WhatsApp carregada em whatsapp-animation.js.');
  } else {
    console.warn('Aviso: Elemento "#whatsapp-animation-container" não encontrado. A animação Lottie não será carregada.');
  }

  // CÓDIGO PARA CONTROLAR A VISIBILIDADE DO BOTÃO DO WHATSAPP NA ROLAGEM
  // Combina as lógicas de mostrar após hero e esconder perto do footer
  if (whatsappButton && heroSection) {
    const handleWhatsappVisibility = () => {
      const heroHeight = heroSection.offsetHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const viewportBottom = window.scrollY + window.innerHeight;
      const distanceFromPageBottom = pageHeight - viewportBottom;

      // Lógica para mostrar o botão depois da seção hero
      if (window.scrollY > heroHeight - 100) {
        whatsappButton.classList.add('show-whatsapp');
      } else {
        whatsappButton.classList.remove('show-whatsapp');
      }

      // Lógica para esconder o botão APENAS quando faltarem 100 pixels para o final da página
      // A classe 'hide-whatsapp' tem '!important' no CSS, então ela prevalecerá.
      if (distanceFromPageBottom <= 100) {
        whatsappButton.classList.add('hide-whatsapp');
      } else {
        whatsappButton.classList.remove('hide-whatsapp');
      }
    };

    window.addEventListener('scroll', handleWhatsappVisibility);
    handleWhatsappVisibility(); // Executa a função uma vez ao carregar para definir o estado inicial
    console.log('Lógica de visibilidade do botão WhatsApp ativada.');
  } else {
    console.error('Erro: Elemento ".whatsapp-float" ou ".hero-section" não encontrado. O controle de visibilidade do WhatsApp não será ativado.');
  }
}