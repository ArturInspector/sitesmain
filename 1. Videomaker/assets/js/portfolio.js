// Video Background Management
const videos = [
    'assets/videos/background/background_2.mp4'
];

let currentVideoIndex = 0;
let currentLang = 'ru';
let isMuted = false;

// Get DOM elements
const videoElement = document.getElementById('backgroundVideo');
const audioElement = document.getElementById('backgroundMusic');
const soundToggle = document.getElementById('soundToggle');
const langSwitch = document.getElementById('langSwitch');

// Portfolio items data
const portfolioItems = [
    {
        id: 'portfolio-wedding-1',
        title: {
            ru: 'Свадебная церемония',
            en: 'Wedding Ceremony'
        },
        description: {
            ru: 'Трогательный момент соединения двух сердец в живописном месте Бишкека',
            en: 'A touching moment of two hearts uniting in a picturesque location in Bishkek'
        },
        video: 'assets/videos/portfolio/portfolio4.mp4',
        category: 'wedding'
    },
    {
        id: 'portfolio-corporate-1',
        title: {
            ru: 'Корпоративный фильм',
            en: 'Corporate Film'
        },
        description: {
            ru: 'Профессиональная съемка для крупной компании в Кыргызстане',
            en: 'Professional filming for a major company in Kyrgyzstan'
        },
        video: 'assets/videos/portfolio/portfolio2.mp4',
        category: 'corporate'
    },
    {
        id: 'portfolio-event-1',
        title: {
            ru: 'Фестиваль "Ысык-Куль"',
            en: 'Issyk-Kul Festival'
        },
        description: {
            ru: 'Захватывающие кадры с главного культурного события региона',
            en: 'Captivating footage from the main cultural event of the region'
        },
        video: 'assets/videos/portfolio/portfolio3.mp4',
        category: 'event'
    },
    {
        id: 'portfolio-wedding-2',
        title: {
            ru: 'Свадьба в горах',
            en: 'Mountain Wedding'
        },
        description: {
            ru: 'Уникальная церемония на фоне величественных гор Кыргызстана',
            en: 'Unique ceremony against the backdrop of majestic Kyrgyz mountains'
        },
        video: 'assets/videos/portfolio/portfolio1.mp4',
        category: 'wedding'
    },
    {
        id: 'portfolio-corporate-2',
        title: {
            ru: 'Бизнес-презентация',
            en: 'Business Presentation'
        },
        description: {
            ru: 'Динамичная съемка для международной конференции',
            en: 'Dynamic filming for an international conference'
        },
        video: 'assets/videos/portfolio/portfolio2.mp4',
        category: 'corporate'
    },
    {
        id: 'portfolio-event-2',
        title: {
            ru: 'Городской фестиваль',
            en: 'City Festival'
        },
        description: {
            ru: 'Яркие моменты празднования в сердце Бишкека',
            en: 'Bright moments of celebration in the heart of Bishkek'
        },
        video: 'assets/videos/portfolio/portfolio3.mp4',
        category: 'event'
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Устанавливаем начальный язык
    currentLang = 'ru';
    initializePortfolio();
    initializeLanguage();
    initializeMedia();
    initializeFadeIn();
    initializeMobileMenu();
    // Обновляем язык при загрузке
    updateLanguage(currentLang);
});

// Initialize portfolio grid
function initializePortfolio() {
    const grid = document.querySelector('.portfolio-grid');
    if (!grid) return; // Проверяем наличие элемента

    const categoryButtons = document.querySelectorAll('[data-category]');
    
    // Очищаем сетку перед добавлением элементов
    grid.innerHTML = '';
    
    // Create portfolio items
    portfolioItems.forEach(item => {
        const element = createPortfolioItem(item);
        grid.appendChild(element);
    });

    // Add category filter functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            filterPortfolio(category);
            
            // Update active button state
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
    });

    // Set initial active state
    const allButton = document.querySelector('[data-category="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
}

// Create portfolio item element
function createPortfolioItem(item) {
    const div = document.createElement('div');
    div.className = 'portfolio-item fade-in';
    div.dataset.category = item.category;
    
    div.innerHTML = `
        <video muted loop playsinline>
            <source src="${item.video}" type="video/mp4">
        </video>
        <div class="portfolio-overlay">
            <h3 class="text-2xl font-bold mb-2" data-lang-title="${item.id}">${item.title[currentLang]}</h3>
            <p class="text-gray-300 mb-4" data-lang-desc="${item.id}">${item.description[currentLang]}</p>
            <button class="px-6 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors" onclick="openVideoModal('${item.video}')">
                <i class="fas fa-play mr-2"></i><span data-lang="watch">${translations[currentLang]['watch']}</span>
            </button>
        </div>
        <div class="play-icon">
            <i class="fas fa-play-circle"></i>
        </div>
    `;

    // Add hover event listeners for video
    const video = div.querySelector('video');
    div.addEventListener('mouseenter', () => {
        video.play().catch(error => {
            console.error('Error playing video:', error);
        });
    });
    
    div.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });

    // Добавляем обработчик клика на всю карточку
    div.addEventListener('click', (e) => {
        // Проверяем, что клик был не по кнопке
        if (!e.target.closest('button')) {
            openVideoModal(item.video);
        }
    });
    
    return div;
}

// Filter portfolio items by category
function filterPortfolio(category) {
    const items = document.querySelectorAll('.portfolio-item');
    const grid = document.querySelector('.portfolio-grid');
    
    // Добавляем класс для анимации
    grid.style.opacity = '0';
    
    setTimeout(() => {
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('visible');
                }, 50);
            } else {
                item.classList.remove('visible');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Возвращаем прозрачность сетки
        setTimeout(() => {
            grid.style.opacity = '1';
        }, 50);
    }, 300);
}

// Initialize mobile menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Закрываем меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

// Initialize language switcher
function initializeLanguage() {
    const langSwitch = document.getElementById('langSwitch');
    let currentLang = 'ru';
    
    langSwitch.addEventListener('click', () => {
        currentLang = currentLang === 'ru' ? 'en' : 'ru';
        updateLanguage(currentLang);
    });
}

// Update page language
function updateLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.dataset.lang;
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update portfolio items
    portfolioItems.forEach(item => {
        const titleElement = document.querySelector(`[data-lang-title="${item.id}"]`);
        const descElement = document.querySelector(`[data-lang-desc="${item.id}"]`);
        
        if (titleElement) titleElement.textContent = item.title[lang];
        if (descElement) descElement.textContent = item.description[lang];
    });
}

// Initialize video and audio
function initializeMedia() {
    // Set up video
    videoElement.src = videos[currentVideoIndex];
    videoElement.muted = true; // Start muted for autoplay
    videoElement.loop = true;
    videoElement.playsInline = true;

    // Set up audio
    audioElement.muted = true; // Start muted
    audioElement.volume = 0.5; // Set initial volume to 50%

    // Try to play video and audio
    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Video autoplay failed:", error);
        });
    }

    // Update sound icon to show muted state
    const icon = soundToggle.querySelector('i');
    icon.className = 'fas fa-volume-mute';
    isMuted = true;
}

// Initialize fade-in animations
function initializeFadeIn() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Video modal functions
function openVideoModal(videoSrc) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    
    video.src = videoSrc;
    modal.classList.remove('hidden');
    video.play().catch(error => {
        console.error('Error playing video:', error);
    });
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    
    video.pause();
    video.src = '';
    modal.classList.add('hidden');
}

// Language translations
const translations = {
    ru: {
        'portfolio-title': 'Портфолио',
        'portfolio-subtitle': 'Профессиональная видеосъемка в Бишкеке',
        'portfolio-all': 'Все',
        'portfolio-wedding': 'Свадьбы',
        'portfolio-corporate': 'Корпоративные',
        'portfolio-event': 'Мероприятия',
        'nav-home': 'Главная',
        'nav-portfolio': 'Портфолио',
        'nav-contact': 'Контакты',
        'watch': 'Смотреть'
    },
    en: {
        'portfolio-title': 'Portfolio',
        'portfolio-subtitle': 'Professional video production in Bishkek',
        'portfolio-all': 'All',
        'portfolio-wedding': 'Wedding',
        'portfolio-corporate': 'Corporate',
        'portfolio-event': 'Events',
        'nav-home': 'Home',
        'nav-portfolio': 'Portfolio',
        'nav-contact': 'Contact',
        'watch': 'Watch'
    }
};

// Sound Toggle Functions
function toggleSound() {
    isMuted = !isMuted;
    videoElement.muted = isMuted;
    audioElement.muted = isMuted;
    
    const icon = soundToggle.querySelector('i');
    icon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';

    // If unmuting, try to play audio
    if (!isMuted) {
        const audioPromise = audioElement.play();
        if (audioPromise !== undefined) {
            audioPromise.catch(error => {
                console.log("Audio playback failed:", error);
            });
        }
    }
}

soundToggle.addEventListener('click', toggleSound); 