import lottie from 'lottie-web';

document.addEventListener('DOMContentLoaded', () => {
    const animationContainer = document.getElementById('whatsapp-animation-container');

    if (animationContainer) {
        lottie.loadAnimation({
            container: animationContainer, // the dom element that will contain the animation
            renderer: 'svg', // 'svg', 'canvas', 'html' - animation render type
            loop: true, // boolean
            autoplay: true, // boolean
            path: 'assets/imgs/whatsapp-animation.json', // path to the JSON animation file
        });
    console.log('Animação Lottie do WhatsApp carregada.');
    } else {
        console.warn('Aviso: Elemento "#whatsapp-animation-container" não encontrado. A animação Lottie não será carregada.');
    }

    // Lógica para esconder o botão APENAS quando faltarem 20 pixels para o final da página
    if (whatsappButton) { // Garante que o botão foi encontrado no HTML
        function checkWhatsappButtonVisibility() {
            // Altura total da página (incluindo a parte não visível)
            const pageHeight = document.documentElement.scrollHeight; 
            // Posição atual do rodapé do viewport em relação ao topo da página
            const viewportBottom = window.scrollY + window.innerHeight; 

            // Distância do rodapé do viewport até o final da página
            const distanceFromPageBottom = pageHeight - viewportBottom;

            // console.log(`Altura da Página: ${pageHeight}, Fundo da Janela: ${viewportBottom}, Distância do Fim: ${distanceFromPageBottom}`);

            // Se a distância for menor ou igual a 100px, significa que estamos no final da página
            if (distanceFromPageBottom <= 100) { 
                whatsappButton.classList.add('hide-whatsapp'); // Adiciona a classe para esconder
                // Não precisamos remover 'show-whatsapp' porque não estamos usando essa lógica aqui.
            } else {
                whatsappButton.classList.remove('hide-whatsapp'); // Remove a classe para mostrar (padrão)
            }
        }

        // Adiciona o 'listener' para o evento de rolagem
        window.addEventListener('scroll', checkWhatsappButtonVisibility);
        // Chama a função uma vez no carregamento para definir o estado inicial do botão
        checkWhatsappButtonVisibility(); 
    } else {
        console.error('Erro: Elemento ".whatsapp-float" não encontrado no HTML. O controle de visibilidade não será ativado.');
    }
}
);