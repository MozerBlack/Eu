// FUNÇÃO PARA ATIVAR O SCROLL REVEAL
document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona todos os elementos que devem ser revelados ao rolar
    const elementsToReveal = document.querySelectorAll('.scroll-reveal-item');
    
    // Configurações para o Intersection Observer
    const observerOptions = {
        root: null, // Observa a partir da viewport
        rootMargin: '0px',
        // O elemento é considerado visível quando 10% dele está na tela
        threshold: 0.1 
    };

    // 2. Cria o observador
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento entrou na viewport
            if (entry.isIntersecting) {
                // 3. Adiciona a classe 'visible', que dispara a transição CSS (animação)
                entry.target.classList.add('visible');
                // Para de observar o elemento, pois ele já foi revelado
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // 4. Inicia a observação de cada elemento
    elementsToReveal.forEach(element => {
        observer.observe(element);
    });
});