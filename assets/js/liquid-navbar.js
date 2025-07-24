// assets/js/liquid-navbar.js

/**
 * Script para aprimorar o efeito Liquid Glass da navbar
 * Adiciona interatividade baseada no scroll e detecção de tema
 */

class LiquidGlassNavbar {
  constructor() {
    this.navbar = document.querySelector('.main-header');
    this.scrollThreshold = 50;
    this.lastScrollY = window.scrollY;
    this.isScrolled = false;
    
    this.init();
  }

  init() {
    if (!this.navbar) return;
    
    // Detecta tema do sistema automaticamente
    this.detectSystemTheme();
    
    // Event listeners
    this.addScrollListener();
    this.addThemeListener();
    this.addInteractionEffects();
  }

  // Detecta e aplica tema do sistema
  detectSystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.applyTheme(prefersDark.matches ? 'dark' : 'light');
  }

  // Aplica tema
  applyTheme(theme) {
    const body = document.body;
    
    if (theme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }

  // Listener para mudanças de tema do sistema
  addThemeListener() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', (e) => {
      this.applyTheme(e.matches ? 'dark' : 'light');
    });
  }

  // Efeito baseado no scroll
  addScrollListener() {
    let ticking = false;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Adiciona classe quando passou do threshold
      if (currentScrollY > this.scrollThreshold && !this.isScrolled) {
        this.navbar.classList.add('scrolled');
        this.isScrolled = true;
      } else if (currentScrollY <= this.scrollThreshold && this.isScrolled) {
        this.navbar.classList.remove('scrolled');
        this.isScrolled = false;
      }

      // Efeito sutil baseado na velocidade do scroll
      const scrollSpeed = Math.abs(currentScrollY - this.lastScrollY);
      if (scrollSpeed > 5) {
        this.navbar.style.setProperty('--glass-saturation', '180%');
        
        // Remove o efeito após um tempo
        setTimeout(() => {
          this.navbar.style.setProperty('--glass-saturation', '150%');
        }, 150);
      }

      this.lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }, { passive: true });
  }

  // Efeitos de interação nos links
  addInteractionEffects() {
    const navLinks = this.navbar.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
      // Efeito de "ripple" sutil no hover
      link.addEventListener('mouseenter', (e) => {
        this.createRippleEffect(e.target);
      });

      // Efeito de focus para acessibilidade
      link.addEventListener('focus', (e) => {
        e.target.style.setProperty('--glass-reflex-light', '1.2');
      });

      link.addEventListener('blur', (e) => {
        e.target.style.removeProperty('--glass-reflex-light');
      });
    });
  }

  // Cria um efeito sutil de "ripple" no hover
  createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      width: 100px;
      height: 100px;
      border-radius: 50%;
      pointer-events: none;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      animation: liquidRipple 600ms ease-out;
      z-index: -1;
    `;

    // Verifica se o elemento pai tem position relative
    const parent = element.closest('li') || element;
    const computedStyle = getComputedStyle(parent);
    if (computedStyle.position === 'static') {
      parent.style.position = 'relative';
    }

    parent.appendChild(ripple);

    // Remove o elemento após a animação
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  // Método público para alternar tema manualmente
  toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    this.applyTheme(isDark ? 'light' : 'dark');
  }

  // Método público para forçar atualização
  refresh() {
    this.detectSystemTheme();
  }
}

// CSS para a animação do ripple (injeta dinamicamente)
const rippleCSS = `
  @keyframes liquidRipple {
    0% { 
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% { 
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }
`;

// Injeta o CSS da animação
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.liquidNavbar = new LiquidGlassNavbar();
});

// Para uso manual (opcional):
// window.liquidNavbar.toggleTheme(); // Alterna tema
// window.liquidNavbar.refresh();     // Força atualização