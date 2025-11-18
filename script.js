// JAVASCRIPT: Lógica de Animação (Scroll Reveal e Carrossel)

document.addEventListener('DOMContentLoaded', () => {
    
    // --------------------------------------
    // 1. LÓGICA DO SCROLL REVEAL (Animação de entrada)
    // --------------------------------------
    const elementsToReveal = document.querySelectorAll('.reveal-item');
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    elementsToReveal.forEach(element => {
        observer.observe(element);
    });

    // --------------------------------------
    // 2. LÓGICA DO CARROSSEL (Funcionalidade)
    // --------------------------------------
    const startCarousel = () => {
        const track = document.querySelector('.carousel-track');
        const slides = Array.from(document.querySelectorAll('.carousel-slide'));
        const nextButton = document.querySelector('.carousel-button.next');
        const prevButton = document.querySelector('.carousel-button.prev');
        const indicatorsContainer = document.querySelector('.carousel-indicators');

        if (!track || slides.length === 0) return;

        let currentSlideIndex = 0;
        
        // Cria os indicadores (os pontinhos)
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => {
                moveToSlide(index);
            });
            indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = Array.from(document.querySelectorAll('.indicator'));

        const updateIndicators = (targetIndex) => {
            indicators.forEach(indicator => indicator.classList.remove('active'));
            indicators[targetIndex].classList.add('active');
        }

        const moveToSlide = (targetIndex) => {
            // Calcula a largura do slide em tempo real
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = 'translateX(-' + (targetIndex * slideWidth) + 'px)';
            currentSlideIndex = targetIndex;
            updateIndicators(targetIndex);
        }

        // Navegação para o próximo slide
        nextButton.addEventListener('click', () => {
            let newIndex = (currentSlideIndex + 1) % slides.length;
            moveToSlide(newIndex);
        });

        // Navegação para o slide anterior
        prevButton.addEventListener('click', () => {
            let newIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            moveToSlide(newIndex);
        });

        // Ajusta o carrossel se a tela for redimensionada (para manter o slide correto visível)
        window.addEventListener('resize', () => {
            moveToSlide(currentSlideIndex); 
        });
        
        // Posicionamento inicial
        moveToSlide(0); 
    };

    startCarousel();
});