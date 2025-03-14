// Mostrar/ocultar la galería de ilustraciones
const toggleButton = document.getElementById('toggle-ilustraciones');
const galleryGrid = document.querySelector('.gallery-grid');

toggleButton.addEventListener('click', () => {
    galleryGrid.classList.toggle('visible');
});

// Funcionalidad de deslizamiento y desenfoque en tiempo real
const imageContainers = document.querySelectorAll('.gallery-grid .image-container');
let isDragging = false;
let startX, scrollLeft;

// Función para calcular el índice activo basado en la posición de desplazamiento
function getActiveIndex() {
    const containerWidth = imageContainers[0].offsetWidth; // Ancho de cada contenedor de imagen
    const scrollPosition = galleryGrid.scrollLeft;
    return Math.round(scrollPosition / containerWidth); // Índice de la imagen activa
}

// Función para actualizar el desenfoque en tiempo real
function updateBlurEffect() {
    const activeIndex = getActiveIndex(); // Obtener el índice activo actual

    imageContainers.forEach((container, index) => {
        const distance = Math.abs(index - activeIndex); // Distancia entre la imagen actual y la activa
        const blurAmount = Math.min(5, distance * 2); // Cantidad de desenfoque proporcional a la distancia
        container.style.filter = `blur(${blurAmount}px)`; // Aplicar el desenfoque
    });
}

// Función para centrar la imagen activa
function centerActiveImage() {
    const activeIndex = getActiveIndex(); // Obtener el índice activo actual
    const activeImage = imageContainers[activeIndex];

    // Centrar la imagen activa
    activeImage.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

    // Actualizar las clases activas
    imageContainers.forEach((container, index) => {
        if (index === activeIndex) {
            container.classList.add('active'); // Marcar la imagen como activa
        } else {
            container.classList.remove('active'); // Desmarcar las demás imágenes
        }
    });
}

// Eventos para el desplazamiento con el mouse
galleryGrid.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - galleryGrid.offsetLeft;
    scrollLeft = galleryGrid.scrollLeft;
});

galleryGrid.addEventListener('mouseleave', () => {
    isDragging = false;
});

galleryGrid.addEventListener('mouseup', () => {
    isDragging = false;
    centerActiveImage(); // Centrar la imagen activa al soltar el mouse
});

galleryGrid.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - galleryGrid.offsetLeft;
    const walk = (x - startX) * 2; // Velocidad de desplazamiento
    galleryGrid.scrollLeft = scrollLeft - walk;
    updateBlurEffect(); // Actualizar el desenfoque en tiempo real
});

// Eventos para el desplazamiento táctil en móviles
galleryGrid.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - galleryGrid.offsetLeft;
    scrollLeft = galleryGrid.scrollLeft;
});

galleryGrid.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - galleryGrid.offsetLeft;
    const walk = (x - startX) * 2; // Velocidad de desplazamiento
    galleryGrid.scrollLeft = scrollLeft - walk;
    updateBlurEffect(); // Actualizar el desenfoque en tiempo real
});

galleryGrid.addEventListener('touchend', () => {
    centerActiveImage(); // Centrar la imagen activa al soltar el dedo
});

// Zoom con doble clic o doble tap
document.querySelectorAll('.gallery-image').forEach(image => {
    let lastTouch = 0;

    // Zoom con doble clic (escritorio)
    image.addEventListener('dblclick', () => {
        image.classList.toggle('zoomed');
    });

    // Zoom con doble tap (móviles)
    image.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            const now = new Date().getTime();
            if (now - lastTouch < 300) { // Doble tap
                image.classList.toggle('zoomed');
            }
            lastTouch = now;
        }
    });
});

// Modal para vista ampliada
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.querySelector('.close');

document.querySelectorAll('.gallery-image').forEach(image => {
    image.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImage.src = image.src;
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});