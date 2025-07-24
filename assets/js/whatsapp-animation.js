document.addEventListener('DOMContentLoaded', () => {
    const animationContainer = document.getElementById('whatsapp-animation-container');
    const whatsappButton = document.querySelector('.whatsapp-float'); // Adicionar esta linha

    if (animationContainer) {
        lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/imgs/whatsapp-animation.json',
        });
        console.log('Animação Lottie do WhatsApp carregada.');
    } else {
        console.warn('Aviso: Elemento "#whatsapp-animation-container" não encontrado. A animação Lottie não será carregada.');
    }

    // Lógica para esconder o botão APENAS quando faltarem 20 pixels para o final da página
    if (whatsappButton) {
        function checkWhatsappButtonVisibility() {
            const pageHeight = document.documentElement.scrollHeight; 
            const viewportBottom = window.scrollY + window.innerHeight; 
            const distanceFromPageBottom = pageHeight - viewportBottom;

            if (distanceFromPageBottom <= 100) { 
                whatsappButton.classList.add('hide-whatsapp');
            } else {
                whatsappButton.classList.remove('hide-whatsapp');
            }
        }

        window.addEventListener('scroll', checkWhatsappButtonVisibility);
        checkWhatsappButtonVisibility(); 
    } else {
        console.error('Erro: Elemento ".whatsapp-float" não encontrado no HTML. O controle de visibilidade não será ativado.');
    }
});