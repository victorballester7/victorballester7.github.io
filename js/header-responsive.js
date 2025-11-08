function toggleMobileMenu() {
    const menu = document.getElementById('nav-menu');
    const button = document.getElementById('mobile-menu-toggle');
    menu.classList.toggle('open');
    button.classList.toggle('open-menu');
}

// Obre i tanca menú en mòbil
document.querySelector("#mobile-menu-toggle")
    .addEventListener("click", () => {
    toggleMobileMenu();
});

// Tancar menú en clicar enllaç
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-menu').classList.remove('open');
    });
});

// Tancar menú en clicar fora
document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav');
    const menu = document.getElementById('nav-menu');
    
    if (!nav.contains(e.target) && menu.classList.contains('open')) {
        menu.classList.remove('open');
    }
});