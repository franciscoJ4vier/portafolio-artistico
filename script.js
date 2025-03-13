// Mostrar/ocultar la galería de ilustraciones
const toggleButton = document.getElementById('toggle-ilustraciones');
const galleryGrid = document.querySelector('.gallery-grid');

toggleButton.addEventListener('click', () => {
    galleryGrid.classList.toggle('visible');

    // Aplicar animación de aparición/desaparición a cada imagen
    const imageContainers = galleryGrid.querySelectorAll('.image-container');
    if (galleryGrid.classList.contains('visible')) {
        imageContainers.forEach((container, index) => {
            setTimeout(() => {
                container.style.opacity = 1;
                container.style.transform = 'translateY(0)';
            }, index * 100); // Retraso para animación secuencial
        });
    } else {
        imageContainers.forEach((container, index) => {
            setTimeout(() => {
                container.style.opacity = 0;
                container.style.transform = 'translateY(20px)';
            }, index * 100); // Retraso para animación secuencial
        });
    }
});

// Efecto de lupa
document.querySelectorAll('.gallery-image').forEach(image => {
    const zoomPreview = image.parentElement.querySelector('.zoom-preview');

    image.addEventListener('mousemove', (e) => {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calcular la posición del cursor en porcentajes
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        // Actualizar el fondo del cuadro de lupa
        zoomPreview.style.backgroundImage = `url(${image.src})`;
        zoomPreview.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
    });

    image.addEventListener('mouseleave', () => {
        zoomPreview.style.display = 'none';
    });

    image.addEventListener('mouseenter', () => {
        zoomPreview.style.display = 'block';
    });
});