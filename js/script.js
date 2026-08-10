// ==================== NAVEGACIÓN ACTIVA ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== SCROLL REVELADO (efecto artístico) ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar a elementos con clase .gallery-item, .estilo-card, .artista-container, .contacto-container
document.querySelectorAll('.gallery-item, .estilo-card, .artista-container, .contacto-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(el);
});

// ==================== EFECTO DE TINTA EN GALERÍA ====================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.filter = 'brightness(1.1) contrast(1.05)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.filter = 'brightness(1) contrast(1)';
    });
});

// ==================== FORMULARIO ====================
const form = document.getElementById('contactForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const idea = document.getElementById('idea').value;

    if (nombre && email) {
        // Animación de éxito
        const btn = this.querySelector('.btn-submit');
        const originalText = btn.textContent;
        btn.textContent = '✓ Enviado';
        btn.style.background = '#c9a87c';
        btn.style.color = '#0a0a0a';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'transparent';
            btn.style.color = '#e8e0d4';
            this.reset();
        }, 3000);

        console.log('Mensaje enviado:', { nombre, email, idea });
    }
});

// ==================== EFECTO DE PARALLAX EN ENTRADA ====================
const entrada = document.querySelector('.section-entrada');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (entrada) {
        entrada.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ==================== EFECTO DE TINTA EN EL TÍTULO ====================
const titulo = document.querySelector('.entrada-titulo');

if (titulo) {
    setInterval(() => {
        const lines = titulo.querySelectorAll('span');
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '0.6';
                setTimeout(() => {
                    line.style.opacity = '1';
                }, 200);
            }, index * 300);
        });
    }, 5000);
}

console.log('🎨 Estudio de Arte en Piel - Diseño artístico');