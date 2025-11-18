// JAVASCRIPT: Lógica de Animação (Scroll Reveal)

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona todos os elementos marcados para serem revelados
    const elementsToReveal = document.querySelectorAll('.reveal-item');
    
    // Configurações do observador (Intersection Observer API)
    const observerOptions = {
        root: null, // Observa a partir da viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% do elemento visível
    };

    // 2. Cria o Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 3. Se o elemento está na viewport
            if (entry.isIntersecting) {
                // Adiciona a classe 'visible', disparando a animação CSS
                entry.target.classList.add('visible');
                // Para de observar o elemento
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // 4. Inicia a observação em cada elemento
    elementsToReveal.forEach(element => {
        observer.observe(element);
    });
});