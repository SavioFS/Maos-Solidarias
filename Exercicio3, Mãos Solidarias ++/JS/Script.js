// SPA
const pageTitles = {
    'inicio': 'Mãos Solidárias - Início',
    'projetos': 'Mãos Solidárias - Projetos Sociais',
    'cadastro': 'Mãos Solidárias - Cadastro'
};

// Mapeamento de classes CSS para o elemento <main>
const mainClasses = {
    'inicio': '',
    'projetos': '',
    'cadastro': 'main-cadastro'
};

function navigate(targetId) {
    // Esconde todas as seções de conteúdo
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Mostra a seção alvo
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Atualiza o título da página e a classe do MAIN
        document.getElementById('page-title').textContent = pageTitles[targetId];
        document.getElementById('app-main').className = mainClasses[targetId]; // Aplica a classe ao elemento main

        // Rola para o topo da página
        window.scrollTo(0, 0);
        
        // Atualiza a URL sem recarregar a página
        history.pushState(null, '', `#${targetId}`);
        
        // Fecha o menu mobile se estiver aberto
        const navList = document.getElementById('main-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        if (navList.classList.contains('open')) {
            navList.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
}

// Inicializa a navegação
document.addEventListener('DOMContentLoaded', () => {
    // Escuta cliques nos links de navegação
    document.querySelectorAll('.nav-list a[data-target]').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('data-target');
            navigate(targetId);
        });
    });
    
    // Roteamento inicial baseado na hash da URL
    const initialHash = window.location.hash.substring(1) || 'inicio';
    const validTargets = ['inicio', 'projetos', 'cadastro'];
    
    if (validTargets.includes(initialHash)) {
        navigate(initialHash);
    } else {
        navigate('inicio');
    }
});

// Máscaras e Validação

function showMessage(message, isSuccess) {
    const messageBox = document.getElementById('form-message');
    messageBox.style.display = 'block';
    messageBox.style.opacity = '1';
    messageBox.innerHTML = message;
    
    messageBox.classList.remove('success', 'error');
    if (isSuccess) {
        messageBox.classList.add('success');
    } else {
        messageBox.classList.add('error');
    }
    
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 5000);
}

function maskCPF(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    if (value.length > 14) { value = value.substring(0, 14); }
    input.value = value;
}

function maskPhone(input) {
    let value = input.value.replace(/\D/g, "");
    value = value.substring(0, 11);

    if (value.length > 0) { value = "(" + value; }
    if (value.length > 3) { value = value.replace(/(\d{2})(\d)/, "$1) $2"); }
    if (value.length === 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"); 
    } else if (value.length > 9) {
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3"); 
    }
    
    input.value = value;
}

function maskCEP(input) {
    let value = input.value.replace(/\D/g, "");
    value = value.substring(0, 8); 

    if (value.length > 5) {
        value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }

    input.value = value;
}

//Envio do Formulário
document.getElementById('cadastro-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (this.checkValidity()) {
        showMessage('Sucesso! Seu cadastro foi enviado. Agradecemos seu interesse em ajudar!', true);
        this.reset();
    } else {
        showMessage('Atenção! Por favor, preencha todos os campos obrigatórios e válidos corretamente.', false);
        this.reportValidity(); 
    }
});


// Mobile e Dropdown
document.addEventListener('DOMContentLoaded', () => {
    // Dropdown (Projetos)
    const dropdown = document.querySelector('.has-dropdown');
    const submenu = document.querySelector('.dropdown-menu');

    if (dropdown && submenu) {
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth >= 769) {
                submenu.style.display = 'block';
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 769) {
                submenu.style.display = 'none';
            }
        });
    }

    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.getElementById('main-menu');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('open');
        });
    }
});