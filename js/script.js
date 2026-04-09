document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica do Menu Mobile ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    // Alterna o menu ao clicar no ícone de hambúrguer
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        
        // Opcional: Animação do ícone de hambúrguer (transformando num "X")
        mobileMenu.classList.toggle('open');
    });

    // Fecha o menu mobile ao clicar em algum link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenu.classList.remove('open');
        });
    });

    // --- Lógica do Cabeçalho com Sombra na Rolagem ---
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

});