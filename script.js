document.addEventListener('DOMContentLoaded', () => {
    // Elementos principales
    const card = document.getElementById('card');
    const giftImage = document.getElementById('giftImage');
    const surpriseImage = document.getElementById('surpriseImage');
    const magicButton = document.getElementById('magic-button');
    
    // Generar corazones flotantes
    function createHearts() {
        const heartsContainer = document.querySelector('.hearts-container');
        for(let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animation = `falling-hearts ${Math.random() * 3 + 5}s linear infinite`;
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heartsContainer.appendChild(heart);
        }
    }
    
    // Eventos de apertura
    function handleOpen() {
        if(!card.classList.contains('open')) {
            card.classList.add('open');
            giftImage.style.display = 'block';
        }
    }
    
    // Eventos táctiles para móviles
    let touchStartTime = 0;
    
    card.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
        e.preventDefault();
    }, { passive: false });
    
    card.addEventListener('touchend', (e) => {
        if(Date.now() - touchStartTime < 500) {
            handleOpen();
        }
    });
    
    // Evento de clic para desktop
    card.addEventListener('click', handleOpen);
    
    // Revelar sorpresa
    magicButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Ocultar elementos
        const elementsToHide = [
            giftImage,
            document.querySelector('.poem'),
            magicButton
        ];
        
        elementsToHide.forEach(element => {
            element.style.transition = 'opacity 0.8s ease';
            element.style.opacity = '0';
        });
        
        // Mostrar sorpresa
        setTimeout(() => {
            elementsToHide.forEach(element => element.remove());
            surpriseImage.style.display = 'block';
            setTimeout(() => {
                surpriseImage.classList.add('reveal');
                card.style.background = 'transparent';
                createHearts(); // Activar corazones finales
            }, 50);
        }, 800);
    });
    
    // Inicialización
    giftImage.style.display = 'none';
    surpriseImage.style.display = 'none';
    createHearts();
});