// assets/js/play_video.js


export function initVideoPlayers() {
  const videoWrappers = document.querySelectorAll('.video-wrapper');

  videoWrappers.forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const playButton = wrapper.querySelector('.play-button'); // Pode ser útil para adicionar classes visuais ao botão

    // Se não encontrar o vídeo dentro do wrapper, pula para o próximo
    if (!video) {
      console.warn('Nenhum elemento <video> encontrado dentro de .video-wrapper:', wrapper);
      return;
    }

    // Clica no wrapper para controlar a reprodução
    wrapper.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        wrapper.classList.add('playing');
        // Opcional: esconde o playButton se ele for um elemento separado
        if (playButton) {
            playButton.style.display = 'none';
        }
      } else {
        video.pause();
        wrapper.classList.remove('playing');
        // Opcional: mostra o playButton se ele for um elemento separado
        if (playButton) {
            playButton.style.display = 'flex'; // ou 'block', dependendo do seu CSS
        }
      }
    });

    // Observa os eventos do vídeo para garantir o estado correto do wrapper
    video.addEventListener('play', function() {
      wrapper.classList.add('playing');
      if (playButton) {
          playButton.style.display = 'none';
      }
    });

    video.addEventListener('pause', function() {
      wrapper.classList.remove('playing');
      if (playButton) {
          playButton.style.display = 'flex'; // ou 'block'
      }
    });

    video.addEventListener('ended', function() {
        wrapper.classList.remove('playing');
        if (playButton) {
            playButton.style.display = 'flex'; // ou 'block'
        }
    });

    // Esconde controles nativos para evitar duplicação e garante 'playsinline' e 'muted'
    video.removeAttribute('controls');
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');

    // Garante que o estado inicial do botão de play é correto se o vídeo não estiver tocando
    if (video.paused && playButton) {
        playButton.style.display = 'flex'; // ou 'block'
    } else if (!video.paused && playButton) {
        playButton.style.display = 'none';
    }
  });
}