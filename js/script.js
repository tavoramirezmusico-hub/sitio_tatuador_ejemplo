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

// ===== EMBLEMA: generar rayos + dibujar líneas al cargar =====
(function buildEmblem() {
    const ticksGroup = document.querySelector('.e-ticks');
    if (ticksGroup) {
        const cx = 200, cy = 200, count = 36;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const long = i % 3 === 0;
            const rInner = 158;
            const rOuter = long ? 186 : 172;
            const x1 = cx + Math.cos(angle) * rInner;
            const y1 = cy + Math.sin(angle) * rInner;
            const x2 = cx + Math.cos(angle) * rOuter;
            const y2 = cy + Math.sin(angle) * rOuter;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1.toFixed(1));
            line.setAttribute('y1', y1.toFixed(1));
            line.setAttribute('x2', x2.toFixed(1));
            line.setAttribute('y2', y2.toFixed(1));
            line.setAttribute('opacity', long ? '0.75' : '0.35');
            ticksGroup.appendChild(line);
        }
    }

    const emblem = document.querySelector('.emblem-svg');
    if (!emblem) return;
    const shapes = emblem.querySelectorAll('path, circle, ellipse, line');

    shapes.forEach((el, i) => {
        let length = 40;
        try {
            if (el.getTotalLength) length = el.getTotalLength();
            else length = 20;
        } catch (e) { length = 20; }

        if (reduceMotion) {
            el.style.opacity = '1';
            return;
        }

        el.style.strokeDasharray = length;
        el.style.strokeDashoffset = length;
        el.style.opacity = el.tagName === 'circle' && el.classList.contains('e-pupil') ? '0' : '1';

        setTimeout(() => {
            el.style.strokeDashoffset = '0';
            if (el.classList.contains('e-pupil')) {
                el.style.transition = 'opacity 0.6s ease';
                el.style.opacity = '1';
            }
        }, 200 + i * 70);
    });
})();

// ===== SCROLL REVELADO (IntersectionObserver) =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .m-item, .estilo-row, .artista-wrapper, .contacto-grid')
    .forEach((el, i) => {
        if (!reduceMotion) {
            el.style.transitionDelay = `${(i % 6) * 70}ms`;
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

// ===== FORMULARIO =====
const form = document.getElementById('contactForm');
form?.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('.form-btn');
    const label = btn.querySelector('.btn-label');
    const original = label.textContent;
    label.textContent = 'Idea enviada';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--ink)';
    btn.style.borderColor = 'var(--gold)';
    setTimeout(() => {
        label.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
        this.reset();
    }, 2600);
});

console.log('Tinta & Sombra · Estudio de Tatuaje');