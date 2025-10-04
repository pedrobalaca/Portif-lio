document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Efeito de Máquina de Escrever (Typing Effect) + Troca de Ícone Dinâmica
    // ----------------------------------------------------------------------
    const textoDigitadoElement = document.querySelector('.texto-digitado');
    const iconePerfilElement = document.querySelector('.icone-perfil-dinamico i');

    const textosParaDigitar = [
        "Trainee em TI", 
        "Entusiasta de Linux", 
        "Fã da Cultura Maker", 
        "Apaixonado por Ciência",
    ];

    // Mapeamento de texto para ícone (Font Awesome classes)
    const iconesPorTexto = {
        "Trainee em TI": "fas fa-microchip", // Ícone de chip/TI
        "Entusiasta de Linux": "fab fa-linux", // Ícone do Linux (pinguim)
        "Fã da Cultura Maker": "fas fa-tools", // Ícone de ferramentas (maker)
        "Apaixonado por Ciência": "fas fa-atom", // Ícone de átomo (ciência)
    };

    let indexTexto = 0;
    let indexChar = 0;
    let isDeleting = false;

    // Função para trocar o ícone com uma pequena animação
    function trocarIcone(novoIconeClasse) {
        if (!iconePerfilElement) return;

        iconePerfilElement.style.animation = 'none'; // Reseta a animação
        iconePerfilElement.offsetHeight; // Força reflow
        iconePerfilElement.style.animation = ''; // Reinicia
        
        // Remove todas as classes "fa-" e adiciona a nova
        iconePerfilElement.className = ''; 
        iconePerfilElement.classList.add(...novoIconeClasse.split(' '));
    }

    function digitar() {
        if (!textoDigitadoElement || !iconePerfilElement) return;
        
        const textoAtual = textosParaDigitar[indexTexto];
        let textoParcial = textoAtual.substring(0, indexChar);

        textoDigitadoElement.textContent = textoParcial;

        // Troca o ícone no início de cada nova frase
        if (!isDeleting && indexChar === 0) {
            const novoIcone = iconesPorTexto[textoAtual] || "fas fa-laptop-code"; // Ícone padrão se não houver mapeamento
            trocarIcone(novoIcone);
        }

        if (!isDeleting) {
            indexChar++;
            if (indexChar > textoAtual.length) {
                isDeleting = true;
                // Pausa antes de começar a apagar
                setTimeout(digitar, 1500); 
                return;
            }
        } else {
            indexChar--;
            if (indexChar < 0) {
                isDeleting = false;
                indexTexto = (indexTexto + 1) % textosParaDigitar.length;
                // Pausa antes de digitar o próximo texto
                setTimeout(digitar, 500); 
                return;
            }
        }

        const velocidade = isDeleting ? 50 : 100; // Apaga mais rápido
        setTimeout(digitar, velocidade);
    }

    // Inicia o efeito 2 segundos após o carregamento da página
    setTimeout(digitar, 2000); 


    // ----------------------------------------------------------------------
    // 2. Animação de Cards ao Scrollar (Scroll Reveal)
    // ----------------------------------------------------------------------
    const cards = document.querySelectorAll('.habilidade-card');
    const observadorOpcoes = {
        root: null,
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
    };

    const observador = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const delay = card.getAttribute('data-i') * 0.2; 
                
                card.style.animation = `slideUp 1s ease forwards ${delay}s`;
                
                observer.unobserve(card); 
            }
        });
    }, observadorOpcoes);

    cards.forEach(card => {
        observador.observe(card);
    });

    // ----------------------------------------------------------------------
    // 3. Marcação de Link Ativo no Header
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('ativo');
                    const activeLink = document.querySelector(`.navbar a[href*='${id}']`);
                    if (activeLink) {
                         activeLink.classList.add('ativo');
                    }
                });
            }
        });
    };
});