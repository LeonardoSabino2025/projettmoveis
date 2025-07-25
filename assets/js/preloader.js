export function initPreloader() {

    // Preloader com tempo mínimo
    let minimumTimeElapsed = false;
    let pageLoaded = false;

    // Tempo mínimo de 2 segundos
    setTimeout(() => {
        minimumTimeElapsed = true;
        if (pageLoaded) {
            hidePreloader();
        }
    }, 2000);

    // Quando a página carregar
    window.addEventListener('load', function () {
        pageLoaded = true;
        if (minimumTimeElapsed) {
            hidePreloader();
        }
    });

    function hidePreloader() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}