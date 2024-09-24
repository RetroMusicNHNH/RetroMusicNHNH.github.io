// Efecto de scroll para la barra de navegación y agregar clase 'scrolled'
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(44, 62, 80, 0.9)';
            nav.classList.add('scrolled'); // Agregar clase 'scrolled'
        } else {
            nav.style.backgroundColor = 'var(--secondary-color)';
            nav.classList.remove('scrolled'); // Remover clase 'scrolled'
        }
    });

    // Manejo de comentarios usando arreglo para almacenar los comentarios
    const comentarios = [
        'Me parece muy interesante cómo el neoliberalismo ha moldeado el mundo actual.',
        'Considero que la globalización ha traído más beneficios que problemas, aunque hay retos a superar.'
    ];

    const comentariosExistentes = document.getElementById('comentarios-existentes');
    const nuevoComentario = document.getElementById('nuevo-comentario');
    const formularioComentarios = document.getElementById('formulario-comentarios');

    function mostrarComentarios() {
        comentariosExistentes.innerHTML = comentarios.map(comentario => `
            <div class="comentario">
                <p>${comentario}</p>
                <small>Publicado el ${new Date().toLocaleString()}</small>
            </div>`).join('');
    }

    formularioComentarios.addEventListener('submit', function(e) {
        e.preventDefault();
        const comentario = nuevoComentario.value.trim();
        if (comentario) {
            comentarios.push(comentario);
            nuevoComentario.value = '';
            mostrarComentarios();
        }
    });

    mostrarComentarios();

    // Animación suave al hacer scroll a las secciones
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Botón expandir historia
    document.querySelector('.btn-expandir').addEventListener('click', function() {
        const historiaSection = document.getElementById('historia');
        if (historiaSection.style.maxHeight) {
            historiaSection.style.maxHeight = null;
            this.textContent = 'Expandir Historia';
        } else {
            historiaSection.style.maxHeight = historiaSection.scrollHeight + "px";
            this.textContent = 'Contraer Historia';
        }
    });

    // Efecto parallax en el encabezado
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        let scroll = window.pageYOffset;
        header.style.backgroundPositionY = scroll * 0.5 + 'px';
    });

    // Animación de entrada para las secciones
    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
});
