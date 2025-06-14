// Управление мобильным меню
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const closeMobileMenuButton = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    // Добавляем стили для мобильного меню
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu {
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            visibility: hidden;
        }
        .mobile-menu.active {
            transform: translateX(0);
            visibility: visible;
        }
        .mobile-menu-overlay {
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
        }
        .mobile-menu-overlay.active {
            opacity: 1;
            visibility: visible;
        }
    `;
    document.head.appendChild(style);

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (mobileMenuButton && closeMobileMenuButton && mobileMenu && mobileMenuOverlay) {
        mobileMenuButton.addEventListener('click', openMobileMenu);
        closeMobileMenuButton.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);

        // Закрытие меню при клике на ссылку
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Закрытие меню при нажатии Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initMobileMenu); 