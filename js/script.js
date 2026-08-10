const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== MENÚ MÓVIL =====
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
    toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }));
}

// ===== SCROLL REVELADO =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .corkboard .photo-card, .patch')
    .forEach((el, i) => {
        if (!reduceMotion) {
            el.style.transitionDelay = `${(i % 6) * 60}ms`;
        }
        observer.observe(el);
    });

// ===== NAVEGACIÓN ACTIVA =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.main-nav a[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(s => navObserver.observe(s));

// ===== PARCHES (feedback al tocar) =====
document.querySelectorAll('.patch').forEach(p => {
    p.addEventListener('click', () => {
        p.animate(
            [{ transform: 'rotate(0deg) scale(1)' }, { transform: 'rotate(0deg) scale(0.96)' }, { transform: 'rotate(0deg) scale(1)' }],
            { duration: 260, easing: 'ease-out' }
        );
    });
});

// ===== FORMULARIO =====
const form = document.getElementById('contactForm');
form?.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('.ticket-btn-submit .btn-label');
    const original = btn.textContent;
    btn.textContent = '¡ENVIADO!';
    setTimeout(() => {
        btn.textContent = original;
        this.reset();
    }, 2400);
});

console.log('Tinta & Sombra · Estudio de Tatuaje — corcho');