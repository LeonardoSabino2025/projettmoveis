/* assets/css/liquid-navbar.css */

/* Variáveis CSS para o efeito Liquid Glass */
:root {
  --glass-light: #fff;
  --glass-dark: #000;
  --glass-reflex-light: 1;
  --glass-reflex-dark: 1;
  --glass-saturation: 150%;
  --navbar-bg-opacity: 0.12;
}

/* Tema escuro (opcional - pode ser ativado via classe no body) */
body.dark-theme {
  --glass-reflex-light: 0.3;
  --glass-reflex-dark: 2;
  --glass-saturation: 180%;
  --navbar-bg-opacity: 0.16;
}

/* Aplicando o efeito Liquid Glass melhorado ao cabeçalho principal */
.main-header {
  /* Posicionamento e estrutura */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  
  /* Efeito Liquid Glass avançado */
  background-color: color-mix(in srgb, var(--glass-dark) var(--navbar-bg-opacity), transparent);
  backdrop-filter: blur(12px) saturate(var(--glass-saturation)) brightness(110%);
  -webkit-backdrop-filter: blur(12px) saturate(var(--glass-saturation)) brightness(110%);
  
  /* Sistema de sombras em camadas para profundidade */
  box-shadow: 
    /* Borda interna superior (reflexo de luz) */
    inset 0 0 0 1px color-mix(in srgb, var(--glass-light) calc(var(--glass-reflex-light) * 8%), transparent),
    /* Reflexos internos superiores */
    inset 1.8px 2px 0px -1px color-mix(in srgb, var(--glass-light) calc(var(--glass-reflex-light) * 70%), transparent), 
    inset -2px -1px 0px -1px color-mix(in srgb, var(--glass-light) calc(var(--glass-reflex-light) * 60%), transparent), 
    /* Reflexos internos para profundidade */
    inset -3px -6px 1px -4px color-mix(in srgb, var(--glass-light) calc(var(--glass-reflex-light) * 40%), transparent), 
    /* Sombras internas (parte escura do vidro) */
    inset -0.3px -0.5px 3px 0px color-mix(in srgb, var(--glass-dark) calc(var(--glass-reflex-dark) * 8%), transparent), 
    inset -1px 1.5px 0px -1px color-mix(in srgb, var(--glass-dark) calc(var(--glass-reflex-dark) * 15%), transparent), 
    inset 0px 2px 3px -1px color-mix(in srgb, var(--glass-dark) calc(var(--glass-reflex-dark) * 15%), transparent), 
    inset 1.5px -4px 1px -2px color-mix(in srgb, var(--glass-dark) calc(var(--glass-reflex-dark) * 8%), transparent), 
    /* Sombras externas para elevação */
    0px 1px 4px 0px color-mix(in srgb, var(--glass-dark) calc(var(--glass-reflex-dark) * 8%), transparent), 
    0px 4px 12px 0px color-mix(in srgb, var(--glass-dark) calc(var(--glass-reflex-dark) * 6%), transparent),
    0px 8px 24px 0px color-mix(in srgb, var(--glass-dark) calc(var(--glass-reflex-dark) * 4%), transparent);
  
  /* Transições suaves */
  transition: 
    background-color 400ms cubic-bezier(0.4, 0.0, 0.2, 1),
    box-shadow 400ms cubic-bezier(0.4, 0.0, 0.2, 1),
    backdrop-filter 300ms ease;
}

/* Reflexo superior aprimorado - efeito de "luz líquida" */
.main-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    color-mix(in srgb, var(--glass-light) calc(var(--glass-reflex-light) * 20%), transparent) 10%,
    color-mix(in srgb, var(--glass-light) calc(var(--glass-reflex-light) * 60%), transparent) 30%,
    color-mix(in srgb, var(--glass-light) calc(var(--glass-reflex-light) * 80%), transparent) 50%,
    color-mix(in srgb, var(--glass-light) calc(var(--glass-reflex-light) * 60%), transparent) 70%,
    color-mix(in srgb, var(--glass-light) calc(var(--glass-reflex-light) * 20%), transparent) 90%,
    transparent 100%
  );
  opacity: 0.8;
  filter: blur(0.5px);
  transition: opacity 300ms ease;
}

/* Reflexo inferior sutil para completar o efeito de vidro */
.main-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    color-mix(in srgb, var(--glass-dark) calc(var(--glass-reflex-dark) * 10%), transparent) 20%,
    color-mix(in srgb, var(--glass-dark) calc(var(--glass-reflex-dark) * 20%), transparent) 50%,
    color-mix(in srgb, var(--glass-dark) calc(var(--glass-reflex-dark) * 10%), transparent) 80%,
    transparent 100%
  );
  opacity: 0.6;
  transition: opacity 300ms ease;
}

/* Ajustes para logo com melhor legibilidade */
.main-header .logo a {
  color: color-mix(in srgb, var(--glass-light) 95%, transparent);
  text-shadow: 
    0 1px 3px color-mix(in srgb, var(--glass-dark) 40%, transparent),
    0 0 8px color-mix(in srgb, var(--glass-dark) 20%, transparent);
  transition: all 300ms ease;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: 0.5px;
}

.main-header .logo a:hover {
  color: var(--glass-light);
  text-shadow: 
    0 1px 3px color-mix(in srgb, var(--glass-dark) 50%, transparent),
    0 0 12px color-mix(in srgb, var(--glass-light) 30%, transparent);
}

/* Ajustes para itens do menu de navegação */
.main-header .main-nav ul li a {
  color: color-mix(in srgb, var(--glass-light) 90%, transparent);
  text-shadow: 
    0 1px 2px color-mix(in srgb, var(--glass-dark) 50%, transparent),
    0 0 6px color-mix(in srgb, var(--glass-dark) 25%, transparent);
  transition: all 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.025em;
}

.main-header .main-nav ul li a:hover {
  color: var(--glass-light);
  font-weight: 600;
  text-shadow: 
    0 1px 3px color-mix(in srgb, var(--glass-dark) 60%, transparent),
    0 0 10px color-mix(in srgb, var(--glass-light) 40%, transparent),
    0 0 20px color-mix(in srgb, var(--glass-light) 20%, transparent);
  transform: translateY(-1px);
}

/* Efeito para logo em imagem */
.main-header .logo-img {
  filter: 
    brightness(0) 
    invert(1) 
    drop-shadow(0 1px 3px color-mix(in srgb, var(--glass-dark) 40%, transparent));
  transition: filter 300ms ease;
}

.main-header .logo-img:hover {
  filter: 
    brightness(0) 
    invert(1) 
    drop-shadow(0 1px 3px color-mix(in srgb, var(--glass-dark) 50%, transparent))
    drop-shadow(0 0 8px color-mix(in srgb, var(--glass-light) 30%, transparent));
}

/* Efeito adicional quando a navbar é "ativada" via scroll (opcional) */
.main-header.scrolled {
  --navbar-bg-opacity: 0.18;
  backdrop-filter: blur(16px) saturate(calc(var(--glass-saturation) * 1.2)) brightness(115%);
  -webkit-backdrop-filter: blur(16px) saturate(calc(var(--glass-saturation) * 1.2)) brightness(115%);
}

/* ========== NOVO: OVERLAY ESCURO PARA SEÇÕES HOME E CLIENTS ========== */

/* Overlay escuro aplicado pelo JavaScript */
.main-header.dark-overlay {
  --navbar-bg-opacity: 0.35;
  backdrop-filter: blur(16px) saturate(calc(var(--glass-saturation) * 1.3)) brightness(95%);
  -webkit-backdrop-filter: blur(16px) saturate(calc(var(--glass-saturation) * 1.3)) brightness(95%);
  background-color: color-mix(in srgb, var(--glass-dark) var(--navbar-bg-opacity), transparent);
}

/* Camada adicional de escurecimento */
.main-header.dark-overlay::before {
  opacity: 0.3; /* Reduz a intensidade do reflexo superior */
}

.main-header.dark-overlay::after {
  opacity: 0.8; /* Aumenta ligeiramente o reflexo inferior escuro */
}

/* Melhor contraste para logo quando overlay ativo */
.main-header.dark-overlay .logo a {
  color: rgba(255, 255, 255, 0.98);
  text-shadow: 
    0 1px 4px rgba(0, 0, 0, 0.7),
    0 2px 8px rgba(0, 0, 0, 0.4),
    0 0 12px rgba(255, 255, 255, 0.1);
  font-weight: 600;
}

.main-header.dark-overlay .logo a:hover {
  color: #ffffff;
  text-shadow: 
    0 1px 4px rgba(0, 0, 0, 0.8),
    0 2px 10px rgba(0, 0, 0, 0.5),
    0 0 16px rgba(255, 255, 255, 0.2);
}

/* Melhor contraste para itens do menu quando overlay ativo */
.main-header.dark-overlay .main-nav ul li a {
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.7),
    0 2px 6px rgba(0, 0, 0, 0.4);
  font-weight: 600;
}

.main-header.dark-overlay .main-nav ul li a:hover {
  color: #ffffff;
  text-shadow: 
    0 1px 4px rgba(0, 0, 0, 0.8),
    0 2px 8px rgba(0, 0, 0, 0.5),
    0 0 12px rgba(255, 255, 255, 0.3);
}

/* Logo em imagem com overlay escuro */
.main-header.dark-overlay .logo-img {
  filter: 
    brightness(0) 
    invert(1) 
    drop-shadow(0 1px 4px rgba(0, 0, 0, 0.7))
    drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
}

.main-header.dark-overlay .logo-img:hover {
  filter: 
    brightness(0) 
    invert(1) 
    drop-shadow(0 1px 4px rgba(0, 0, 0, 0.8))
    drop-shadow(0 2px 10px rgba(0, 0, 0, 0.5))
    drop-shadow(0 0 12px rgba(255, 255, 255, 0.2));
}

/* Ícones do menu mobile com overlay escuro */
.main-header.dark-overlay .menu-icon,
.main-header.dark-overlay .menu-toggle span,
.main-header.dark-overlay .hamburger span {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.6),
    0 2px 6px rgba(0, 0, 0, 0.3);
}

.main-header.dark-overlay .menu-icon::before,
.main-header.dark-overlay .menu-icon::after {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.6),
    0 2px 6px rgba(0, 0, 0, 0.3);
}

/* Combinação: overlay escuro + scrolled */
.main-header.dark-overlay.scrolled {
  --navbar-bg-opacity: 0.42;
  backdrop-filter: blur(20px) saturate(calc(var(--glass-saturation) * 1.4)) brightness(90%);
  -webkit-backdrop-filter: blur(20px) saturate(calc(var(--glass-saturation) * 1.4)) brightness(90%);
}

/* ========== FIM DO OVERLAY ESCURO ========== */

/* Adaptações responsivas */
@media (max-width: 768px) {
  .main-header {
    padding: 0.8rem 1rem;
    /* Reduz ligeiramente o blur em telas menores para performance */
    backdrop-filter: blur(10px) saturate(var(--glass-saturation)) brightness(110%);
    -webkit-backdrop-filter: blur(10px) saturate(var(--glass-saturation)) brightness(110%);
  }
  
  .main-header .main-nav ul li a {
    font-size: 15px;
  }
  
  /* Overlay escuro responsivo */
  .main-header.dark-overlay {
    backdrop-filter: blur(14px) saturate(calc(var(--glass-saturation) * 1.3)) brightness(95%);
    -webkit-backdrop-filter: blur(14px) saturate(calc(var(--glass-saturation) * 1.3)) brightness(95%);
  }
}

/* Micro-animação para o carregamento inicial */
@keyframes liquidGlassAppear {
  0% { 
    opacity: 0; 
    backdrop-filter: blur(0px) saturate(100%) brightness(100%);
    -webkit-backdrop-filter: blur(0px) saturate(100%) brightness(100%);
  }
  100% { 
    opacity: 1; 
    backdrop-filter: blur(12px) saturate(var(--glass-saturation)) brightness(110%);
    -webkit-backdrop-filter: blur(12px) saturate(var(--glass-saturation)) brightness(110%);
  }
}

.main-header {
  animation: liquidGlassAppear 600ms ease-out;
}