let currentIndex = 0;
let currentVisibleImages = [];

// Mapeo con nombres legibles en inglés
const categoryLabels = {
    "music": "Music",
    "animation": "Animation",
    "pop-culture": "Pop Culture",
    "gaming": "Gaming",
    "animals": "Animals & Pets",
    "originals": "Originals & Scenes"
};

// Renderizar la cuadrícula de la galería
function renderGallery(category = 'all') {
    const galeria = document.getElementById("galeria");
    if (!galeria) return;
    galeria.innerHTML = "";

    if (category === 'all') {
        currentVisibleImages = [...galleryData];
    } else {
        currentVisibleImages = galleryData.filter(img => img.category === category);
    }

    currentVisibleImages.forEach((item, index) => {
        const figure = document.createElement("figure");
        figure.className = "art-piece";
        figure.setAttribute("data-category", item.category);

        figure.innerHTML = `
            <img src="${item.src}" alt="${item.name}" loading="lazy" onclick="openModal(${index})">
            <figcaption>${item.name}</figcaption>
        `;

        galeria.appendChild(figure);
    });
}

// Abrir modal
function openModal(index) {
    currentIndex = index;
    const item = currentVisibleImages[currentIndex];
    if (!item) return;

    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const caption = document.getElementById("caption");

    modalImage.src = item.src;
    
    const catText = categoryLabels[item.category] || item.category;
    caption.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Category:</strong> ${catText}</p>
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Size:</strong> ${item.size}</p>
    `;

    modal.style.display = "flex";
}

// Cerrar modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Navegación en el modal
function navigate(direction) {
    if (currentVisibleImages.length === 0) return;
    currentIndex = (currentIndex + direction + currentVisibleImages.length) % currentVisibleImages.length;
    const item = currentVisibleImages[currentIndex];

    const modalImage = document.getElementById("modal-image");
    const caption = document.getElementById("caption");

    modalImage.src = item.src;
    const catText = categoryLabels[item.category] || item.category;
    caption.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Category:</strong> ${catText}</p>
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Size:</strong> ${item.size}</p>
    `;
}

// Filtrar por categoría sin saltar al tope de la página
function showCategory(category, event) {
    if (event) {
        event.preventDefault();
    }
    
    renderGallery(category);

    // Mantiene la vista en la galería descontando la altura del nav
    const galeria = document.getElementById('galeria');
    const nav = document.querySelector('nav');
    if (galeria) {
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = galeria.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Modales Contacto y About Me
function openContactModal() { document.getElementById("contact-modal").style.display = "flex"; }
function closeContactModal() { document.getElementById("contact-modal").style.display = "none"; }
function openAboutMeModal() { document.getElementById("about-me-modal").style.display = "flex"; }
function closeAboutMeModal() { document.getElementById("about-me-modal").style.display = "none"; }

// Cerrar modales al hacer clic afuera
window.onclick = function (event) {
    const modal = document.getElementById("modal");
    const contactModal = document.getElementById("contact-modal");
    const aboutMeModal = document.getElementById("about-me-modal");

    if (event.target === modal) closeModal();
    if (event.target === contactModal) closeContactModal();
    if (event.target === aboutMeModal) closeAboutMeModal();
};

// Navegación con teclado
document.addEventListener("keydown", (e) => {
    const modal = document.getElementById("modal");
    if (modal && modal.style.display === "flex") {
        if (e.key === "ArrowLeft") navigate(-1);
        if (e.key === "ArrowRight") navigate(1);
        if (e.key === "Escape") closeModal();
    }
});

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    renderGallery('all');
});