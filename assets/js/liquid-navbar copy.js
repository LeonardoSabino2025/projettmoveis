export function initLiquidNavBar() {

  document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".main-header");
    if (!navbar) {
      console.warn('Navbar element with class ".main-header" not found.');
      return;
    }
    const sectionsToDarken = ["features", "clients"];
    let darkOverlayActive = false;

    // Aplica/remover classe .scrolled quando passa de 60px do topo
    const handleScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Configura o IntersectionObserver para as seções que devem escurecer a navbar
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4 // 40% da seção visível já ativa o efeito
    };

    const observer = new IntersectionObserver((entries) => {
      let shouldDarken = false;

      entries.forEach((entry) => {
        if (entry.isIntersecting && sectionsToDarken.includes(entry.target.id)) {
          shouldDarken = true;
        }
      });

      if (shouldDarken && !darkOverlayActive) {
        navbar.classList.add("dark-overlay");
        darkOverlayActive = true;
      } else if (!shouldDarken && darkOverlayActive) {
        navbar.classList.remove("dark-overlay");
        darkOverlayActive = false;
      }
    }, observerOptions);

    // Observa cada uma das seções alvo
    sectionsToDarken.forEach((id) => {
      const section = document.getElementById(id);
  });
}
    });
  }
  );
}
