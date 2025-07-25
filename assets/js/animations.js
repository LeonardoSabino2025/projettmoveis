// assets/js/animations.js

/**
 * Controlador de Animações para Landing Page
 * Sistema avançado de animações baseado em Intersection Observer
 */

export function initAnimationsController() {
  
    class AnimationsController {
        constructor() {
            this.animatedElements = new Set();
            this.observerOptions = {
                root: null,
                rootMargin: '-10% 0px -10% 0px',
                threshold: [0.1, 0.5, 0.8]
            };
    
            this.init();
        }

        init() {
            // Aguarda o DOM estar pronto
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.setupAnimations();
                    this.setupSpecialAnimations();
                });
            } else {
                this.setupAnimations();
                this.setupSpecialAnimations();
            }
    
            // Observer para mudanças dinâmicas no DOM
            this.setupMutationObserver();
        }

        setupAnimations() {
            // Configura elementos automáticos
            this.setupAutomaticAnimations();
    
            // Configura observer para elementos animados
            this.setupIntersectionObserver();
    
            // Animações especiais no carregamento
            this.setupInitialAnimations();
        }

        setupAutomaticAnimations() {
            // Hero Content
            const heroTitle = document.querySelector('.hero-content h1');
            const heroSubtitle = document.querySelector('.hero-content p');
    
            if (heroTitle) {
                heroTitle.classList.add('fade-in-up');
            }
            if (heroSubtitle) {
                heroSubtitle.classList.add('fade-in-up');
            }

            // Features Section
            const features = document.querySelectorAll('.feature-item');
            features.forEach((feature, index) => {
                if (index % 2 === 0) {
                    feature.classList.add('slide-in-left', 'animate-element');
                } else {
                    feature.classList.add('slide-in-right', 'animate-element');
                }
            });

            // Projects Cards
            const projectCards = document.querySelectorAll('.projects-cards-grid .card');
            projectCards.forEach((card, index) => {
                const animations = ['scale-in', 'zoom-in-up', 'slide-in-bottom'];
                const randomAnimation = animations[index % animations.length];
                card.classList.add(randomAnimation, 'animate-element', 'card-hover-lift');
            });

            // Testimonials
            const testimonials = document.querySelectorAll('.testimonial-item');
            testimonials.forEach((testimonial, index) => {
                testimonial.classList.add('slide-in-left', 'animate-element');
            });

            // Section Titles
            const sectionTitles = document.querySelectorAll('section h2');
            sectionTitles.forEach(title => {
                title.classList.add('slide-in-title', 'animate-element');
            });

            // Logo
            const logo = document.querySelector('.main-header .logo');
            if (logo) {
                logo.classList.add('logo-animated');
            }

            // Footer elements
            const footerCols = document.querySelectorAll('.footer-col');
            footerCols.forEach((col, index) => {
                col.classList.add('fade-in-up', 'animate-element');
            });
        }

        setupIntersectionObserver() {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const element = entry.target;
        
                    if (entry.isIntersecting) {
                        // Elemento está visível
                        if (!this.animatedElements.has(element)) {
                            this.animateElement(element, entry.intersectionRatio);
                            this.animatedElements.add(element);
                        }
                    } else {
                        // Opcional: Re-animar quando sair e voltar (remova se não quiser)
                        if (this.shouldReanimate(element)) {
                            element.classList.remove('animate-active');
                            this.animatedElements.delete(element);
                        }
                    }
                });
            }, this.observerOptions);

            // Observa todos os elementos animados
            this.observeElements();
        }

        observeElements() {
            const animatedElements = document.querySelectorAll(`
      .animate-element,
      .fade-in-up,
      .slide-in-left,
      .slide-in-right,
      .slide-in-title,
      .scale-in,
      .fade-in,
      .zoom-in-up,
      .slide-in-bottom,
      .flip-in-x,
      .bounce-in,
      .slide-rotate,
      .logo-animated,
      .testimonial-item
    `);

            animatedElements.forEach(element => {
                this.observer.observe(element);
            });
        }

        animateElement(element, intersectionRatio) {
            // Delay baseado na posição ou tipo do elemento
            const delay = this.calculateDelay(element);
    
            setTimeout(() => {
                element.classList.add('animate-active');
      
                // Dispara evento customizado
                element.dispatchEvent(new CustomEvent('animated', {
                    detail: { element, intersectionRatio }
                }));
            }, delay);
        }

        calculateDelay(element) {
            // Sem delay para elementos críticos
            if (element.classList.contains('hero-content') ||
                element.classList.contains('logo-animated')) {
                return 0;
            }

            // Delay baseado em data-attribute personalizado
            const customDelay = element.dataset.animationDelay;
            if (customDelay) {
                return parseInt(customDelay);
            }

            // Delay baseado na posição vertical
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementCenter = rect.top + rect.height / 2;
            const distanceFromCenter = Math.abs(elementCenter - windowHeight / 2);
    
            // Elementos mais próximos do centro animam primeiro
            return Math.min(distanceFromCenter / 10, 300);
        }

        shouldReanimate(element) {
            // Re-anima apenas elementos específicos
            return element.classList.contains('reanimate') ||
                element.dataset.reanimate === 'true';
        }

        setupSpecialAnimations() {
            // Animação especial para o logo no header
            setTimeout(() => {
                const logo = document.querySelector('.logo-animated');
                if (logo) {
                    logo.classList.add('animate-active');
                }
            }, 200);

            // Animação especial para o hero content
            setTimeout(() => {
                const heroElements = document.querySelectorAll('.hero-content h1, .hero-content p');
                heroElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('animate-active');
                    }, index * 300);
                });
            }, 500);
        }

        setupInitialAnimations() {
            // Animações que executam imediatamente no carregamento
            const immediateElements = document.querySelectorAll('.animate-immediate');
            immediateElements.forEach(element => {
                element.classList.add('animate-active');
            });
        }

        setupMutationObserver() {
            // Observer para novos elementos adicionados dinamicamente
            const mutationObserver = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.processNewElements(node);
                        }
                    });
                });
            });

            mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        processNewElements(container) {
            // Processa novos elementos adicionados dinamicamente
            const newAnimatedElements = container.querySelectorAll(`
      .animate-element,
      .fade-in-up,
      .slide-in-left,
      .slide-in-right,
      .scale-in
    `);

            newAnimatedElements.forEach(element => {
                this.observer.observe(element);
            });
        }

        // Métodos públicos para controle manual
  
        animateElementManually(selector) {
            const element = document.querySelector(selector);
            if (element) {
                element.classList.add('animate-active');
                this.animatedElements.add(element);
            }
        }

        resetAnimation(selector) {
            const element = document.querySelector(selector);
            if (element) {
                element.classList.remove('animate-active');
                this.animatedElements.delete(element);
            }
        }

        pauseAnimations() {
            document.body.classList.add('animation-paused');
        }

        resumeAnimations() {
            document.body.classList.remove('animation-paused');
        }

        disableAnimations() {
            document.body.classList.add('no-animation');
        }

        enableAnimations() {
            document.body.classList.remove('no-animation');
        }

        // Utilitário para performance
        optimizeForLowEndDevices() {
            // Detecta dispositivos com performance limitada
            if (navigator.hardwareConcurrency <= 2 ||
                navigator.deviceMemory <= 2 ||
                window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      
                // Simplifica animações
                document.body.classList.add('animate-fast');
      
                // Reduz delays
                const elements = document.querySelectorAll('.animate-element');
                elements.forEach(element => {
                    element.style.transitionDelay = '0.05s';
                });
            }
        }

        // Cleanup
        destroy() {
            if (this.observer) {
                this.observer.disconnect();
            }
            this.animatedElements.clear();
        }
    }

    // Inicialização automática
    const animations = new AnimationsController();

    // Otimização para dispositivos com performance limitada
    animations.optimizeForLowEndDevices();

    // Exporta para uso global
    window.animationsController = animations;

    // Event listeners para controles especiais
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            animations.pauseAnimations();
        } else {
            animations.resumeAnimations();
        }
    });

    // Detecta preferência por animações reduzidas
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animations.disableAnimations();
    }

    // Utilitários globais
    window.animateElement = (selector) => animations.animateElementManually(selector);
    window.resetAnimation = (selector) => animations.resetAnimation(selector);

    // Log para debug (remover em produção)
    console.log('🎬 Sistema de Animações Carregado!');

    // Exemplo de uso de eventos customizados
    document.addEventListener('animated', (e) => {
        console.log('Elemento animado:', e.detail.element);
    });
}