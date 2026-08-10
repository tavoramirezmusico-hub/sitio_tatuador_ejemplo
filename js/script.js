// ===== MENÚ MÓVIL =====
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
    toggle.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '70px';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'rgba(12, 10, 10, 0.98)';
        nav.style.padding = '30px';
        nav.style.borderBottom = '1px solid rgba(139,42,42,0.1)';
    });
}

// ===== SCROLL REVELADO =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-card, .estilo-item, .artista-wrapper, .contacto-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(el);
});

// ===== NAVEGACIÓN ACTIVA =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.main-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
            current = section.id;
        }
    });
    navLinks.forEach(link => {
        link.style.opacity = link.getAttribute('href') === `#${current}` ? '1' : '0.4';
    });
});

// ===== FORMULARIO =====
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('.form-btn');
    const original = btn.textContent;
    btn.textContent = '✓ Enviado';
    btn.style.background = '#8b2a2a';
    btn.style.color = '#0c0a0a';
    setTimeout(() => {
        btn.textContent = original;
        btn.style.background = 'transparent';
        btn.style.color = '#d4ccc6';
        this.reset();
    }, 3000);
});

// ===== EFECTO DE TINTA EN HERO =====
document.querySelectorAll('.hero-ink-1, .hero-ink-2, .hero-ink-3').forEach(ink => {
    ink.addEventListener('mouseenter', function () {
        this.style.opacity = '0.1';
    });
    ink.addEventListener('mouseleave', function () {
        this.style.opacity = '0.04';
    });
});

console.log('⛧ TINTA & SOMBRA · Estudio de Tatuajes');