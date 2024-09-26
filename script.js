// Estructura de datos para comentarios
let comentarios = [];

document.addEventListener('DOMContentLoaded', function() {
    // Cargar y mostrar comentarios
    cargarComentarios();
    mostrarComentarios();

    const formularioComentarios = document.getElementById('formulario-comentarios');
    formularioComentarios.addEventListener('submit', agregarComentario);

    // Efecto de scroll para la barra de navegación
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(44, 62, 80, 0.9)';
            nav.classList.add('scrolled');
        } else {
            nav.style.backgroundColor = 'var(--secondary-color)';
            nav.classList.remove('scrolled');
        }
    });

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

function cargarComentarios() {
    const comentariosGuardados = localStorage.getItem('comentarios');
    if (comentariosGuardados) {
        comentarios = JSON.parse(comentariosGuardados);
    }
}

function guardarComentarios() {
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

function agregarComentario(e) {
    e.preventDefault();
    const nuevoComentario = document.getElementById('nuevo-comentario');
    const comentario = nuevoComentario.value.trim();
    if (comentario) {
        const nuevoComentarioObj = {
            id: Date.now(),
            texto: comentario,
            fecha: new Date().toLocaleString(),
            respuestas: []
        };
        comentarios.push(nuevoComentarioObj);
        nuevoComentario.value = '';
        guardarComentarios();
        mostrarComentarios();
    }
}

function mostrarComentarios() {
    const comentariosExistentes = document.getElementById('comentarios-existentes');
    comentariosExistentes.innerHTML = comentarios.map(comentario => `
        <div class="comentario" id="comentario-${comentario.id}">
            <p>${comentario.texto}</p>
            <small>Publicado el ${comentario.fecha}</small>
            <button class="btn-responder" onclick="mostrarFormularioRespuesta(${comentario.id})">Responder</button>
            <div id="respuestas-${comentario.id}" class="respuestas-container">
                ${comentario.respuestas.map(respuesta => `
                    <div class="respuesta">
                        <p>${respuesta.texto}</p>
                        <small>Respondido el ${respuesta.fecha}</small>
                    </div>
                `).join('')}
            </div>
            <div id="formulario-respuesta-${comentario.id}" class="formulario-respuesta" style="display: none;">
                <textarea id="respuesta-${comentario.id}" placeholder="Escribe tu respuesta aquí..."></textarea>
                <button class="btn-enviar-respuesta" onclick="agregarRespuesta(${comentario.id})">Enviar Respuesta</button>
            </div>
        </div>
    `).join('');
}

function mostrarFormularioRespuesta(comentarioId) {
    const formularioRespuesta = document.getElementById(`formulario-respuesta-${comentarioId}`);
    formularioRespuesta.style.display = formularioRespuesta.style.display === 'none' ? 'block' : 'none';
}

function agregarRespuesta(comentarioId) {
    const respuestaTexto = document.getElementById(`respuesta-${comentarioId}`).value.trim();
    if (respuestaTexto) {
        const comentario = comentarios.find(c => c.id === comentarioId);
        if (comentario) {
            comentario.respuestas.push({
                texto: respuestaTexto,
                fecha: new Date().toLocaleString()
            });
            guardarComentarios();
            mostrarComentarios();
        }
    }
}