export function initLiquidNavBar() {
    document.addEventListener("DOMContentLoaded", () => {
        const navbar = document.querySelector(".main-header");
        const sectionsToDarken = ["features", "clients"];
        let darkOverlayActive = false;

        // Aplica/remove classes quando faz scroll
        const handleScroll = () => {
            if (window.scrollY > 60) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        };

        // Chama uma vez para verificar o estado inicial
        handleScroll();
        
        window.addEventListener("scroll", handleScroll);

        // Restante do código do IntersectionObserver...
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.4
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

        sectionsToDarken.forEach((id) => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });
    });
}