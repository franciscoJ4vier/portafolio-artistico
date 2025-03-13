// Mostrar/ocultar la galería de ilustraciones
const toggleButton = document.getElementById('toggle-ilustraciones');
const galleryGrid = document.querySelector('.gallery-grid');

toggleButton.addEventListener('click', () => {
    galleryGrid.classList.toggle('visible');
});

// Doble clic/doble tap para zoom
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

// Evitar zoom en móviles sin bloquear el desplazamiento
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) { // Si hay más de un dedo en la pantalla
        e.preventDefault(); // Evita el zoom
    }
}, { passive: false });