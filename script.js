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
    const containerWidth = imageContainers[0].offsetWidth;
    const scrollPosition = galleryGrid.scrollLeft;
    return Math.round(scrollPosition / containerWidth);
}

// Función para actualizar el desenfoque en tiempo real
function updateBlurEffect() {
    const activeIndex = getActiveIndex();

    imageContainers.forEach((container, index) => {
        const distance = Math.abs(index - activeIndex);
        const blurAmount = Math.min(5, distance * 2);
        container.style.filter = `blur(${blurAmount}px)`;
    });
}

// Función para centrar la imagen activa con un retraso
function centerActiveImage() {
    setTimeout(() => {
        const activeIndex = getActiveIndex();
        const activeImage = imageContainers[activeIndex];

        activeImage.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

        imageContainers.forEach((container, index) => {
            if (index === activeIndex) {
                container.classList.add('active');
            } else {
                container.classList.remove('active');
            }
        });
        updateBlurEffect(); // Actualizar el desenfoque después de centrar
    }, 100); // Retraso de 100ms
}

// Eventos para el desplazamiento con el mouse
galleryGrid.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - galleryGrid.offsetLeft;
    scrollLeft = galleryGrid.scrollLeft;
    galleryGrid.style.scrollSnapType = 'none'; // Desactivar scroll-snap
});

galleryGrid.addEventListener('mouseleave', () => {
    isDragging = false;
});

galleryGrid.addEventListener('mouseup', () => {
    isDragging = false;
    galleryGrid.style.scrollSnapType = 'x proximity'; // Reactivar scroll-snap
    centerActiveImage();
});

galleryGrid.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - galleryGrid.offsetLeft;
    const walk = (x - startX) * 0.5; // Sensibilidad reducida (0.5)
    galleryGrid.scrollLeft = scrollLeft - walk;
    updateBlurEffect();
});

// Eventos para el desplazamiento táctil en móviles
galleryGrid.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - galleryGrid.offsetLeft;
    scrollLeft = galleryGrid.scrollLeft;
    galleryGrid.style.scrollSnapType = 'none'; // Desactivar scroll-snap
});

galleryGrid.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - galleryGrid.offsetLeft;
    const walk = (x - startX) * 0.5; // Sensibilidad reducida (0.5)
    galleryGrid.scrollLeft = scrollLeft - walk;
    updateBlurEffect();
});

galleryGrid.addEventListener('touchend', () => {
    isDragging = false;
    galleryGrid.style.scrollSnapType = 'x proximity'; // Reactivar scroll-snap
    centerActiveImage();
});

// Botones de desplazamiento
const scrollLeftButton = document.getElementById('scroll-left');
const scrollRightButton = document.getElementById('scroll-right');

scrollLeftButton.addEventListener('click', () => {
    galleryGrid.scrollBy({ left: -300, behavior: 'smooth' });
    setTimeout(() => {
        centerActiveImage();
        updateBlurEffect();
    }, 300);
});

scrollRightButton.addEventListener('click', () => {
    galleryGrid.scrollBy({ left: 300, behavior: 'smooth' });
    setTimeout(() => {
        centerActiveImage();
        updateBlurEffect();
    }, 300);
});

// Zoom con doble clic o doble tap
document.querySelectorAll('.gallery-image').forEach(image => {
    let lastTouch = 0;

    image.addEventListener('dblclick', () => {
        image.classList.toggle('zoomed');
    });

    image.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            const now = new Date().getTime();
            if (now - lastTouch < 300) {
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