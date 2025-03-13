// Mostrar/ocultar la galería de ilustraciones
const toggleButton = document.getElementById('toggle-ilustraciones');
const galleryGrid = document.querySelector('.gallery-grid');

toggleButton.addEventListener('click', () => {
    galleryGrid.classList.toggle('visible');
});

// Doble clic/doble tap para zoom
document.querySelectorAll('.gallery-image').forEach(image => {
    image.addEventListener('dblclick', () => {
        image.classList.toggle('zoomed');
    });

    image.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            const now = new Date().getTime();
            const previousTouch = image.dataset.lastTouch || now;
            const delta = now - previousTouch;

            if (delta < 300 && delta > 0) { // Doble tap
                image.classList.toggle('zoomed');
            }

            image.dataset.lastTouch = now;
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

// Evitar zoom en móviles sin congelar la pantalla
document.addEventListener('touchmove', (e) => {
    if (e.scale !== 1) {
        e.preventDefault();
    }
}, { passive: false });