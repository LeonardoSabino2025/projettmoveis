document.addEventListener('DOMContentLoaded', function() {
  const videoWrappers = document.querySelectorAll('.video-wrapper');
  
  videoWrappers.forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const playButton = wrapper.querySelector('.play-button');
    
    // Clica no wrapper para controlar a reprodução
    wrapper.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        wrapper.classList.add('playing');
      } else {
        video.pause();
        wrapper.classList.remove('playing');
      }
    });
    
    // Observa os eventos do vídeo
    video.addEventListener('play', function() {
      wrapper.classList.add('playing');
    });
    
    video.addEventListener('pause', function() {
      wrapper.classList.remove('playing');
    });
    
    // Esconde controles nativos para evitar duplicação
      video.removeAttribute('controls');
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
  });
    
});