// Video Background Management
const videos = [
    'assets/videos/background/background_1.mp4',
    'assets/videos/background/background_2.mp4'
];

let currentVideoIndex = 0;
const videoElement = document.getElementById('backgroundVideo');
const audioElement = document.getElementById('backgroundMusic');
const soundToggle = document.getElementById('soundToggle');
const langSwitch = document.getElementById('langSwitch');

// Language Management
const translations = {
    ru: {
        'hero-title': 'Профессиональная видеосъемка',
        'hero-subtitle': 'Создаю качественные видео для твоих важных моментов',
        'hero-cta': 'Смотреть шоурил',
        'about-title': 'Обо мне',
        'about-text': 'Я профессиональный видеограф, создающий качественные видео для важных моментов твоей жизни. Моя специализация включает свадебную съемку, корпоративные проекты и съемку мероприятий. Каждый проект для меня - это возможность создать уникальную историю.',
        'services-title': 'Услуги',
        'services-subtitle': 'Профессиональная видеосъемка для любых мероприятий',
        'service-wedding-title': 'Свадебная съемка',
        'service-wedding-desc': 'Создаю трогательные истории о самом важном дне в твоей жизни',
        'service-corporate-title': 'Корпоративная съемка',
        'service-corporate-desc': 'Профессиональная видеосъемка для твоего бизнеса',
        'service-event-title': 'Съемка мероприятий',
        'service-event-desc': 'Запечатлею важные моменты твоего события',
        'portfolio-title': 'Портфолио',
        'portfolio-subtitle': 'Мои лучшие работы',
        'portfolio-cta': 'Смотреть все работы',
        'portfolio-wedding': 'Свадебная съемка',
        'portfolio-corporate': 'Корпоративная съемка',
        'contact-title': 'Контакты',
        'contact-subtitle': 'Свяжись со мной для обсуждения твоего проекта',
        'contact-name': 'Имя',
        'contact-email': 'Email',
        'contact-message': 'Сообщение',
        'contact-send': 'Отправить',
        'nav-home': 'Главная',
        'nav-portfolio': 'Портфолио',
        'nav-contact': 'Контакты'
    },
    en: {
        'hero-title': 'Professional Video Production',
        'hero-subtitle': 'Creating quality videos for your important moments',
        'hero-cta': 'Watch Showreel',
        'about-title': 'About Me',
        'about-text': 'I am a professional videographer creating quality videos for your important moments. My specialization includes wedding filming, corporate projects, and event coverage. Each project is an opportunity to create a unique story.',
        'services-title': 'Services',
        'services-subtitle': 'Professional video production for any event',
        'service-wedding-title': 'Wedding Filming',
        'service-wedding-desc': 'Creating touching stories about the most important day of your life',
        'service-corporate-title': 'Corporate Filming',
        'service-corporate-desc': 'Professional video production for your business',
        'service-event-title': 'Event Filming',
        'service-event-desc': 'Capturing important moments of your event',
        'portfolio-title': 'Portfolio',
        'portfolio-subtitle': 'My best works',
        'portfolio-cta': 'View All Works',
        'portfolio-wedding': 'Wedding Filming',
        'portfolio-corporate': 'Corporate Filming',
        'contact-title': 'Contact',
        'contact-subtitle': 'Get in touch to discuss your project',
        'contact-name': 'Name',
        'contact-email': 'Email',
        'contact-message': 'Message',
        'contact-send': 'Send',
        'nav-home': 'Home',
        'nav-portfolio': 'Portfolio',
        'nav-contact': 'Contact'
    }
};

let currentLang = 'ru';

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

// Video Background Functions
function changeVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    const wasPlaying = !videoElement.paused;
    const currentTime = videoElement.currentTime;
    
    videoElement.src = videos[currentVideoIndex];
    
    if (wasPlaying) {
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Video playback failed:", error);
            });
        }
    }
}

// Initialize video background
videoElement.addEventListener('ended', changeVideo);
videoElement.addEventListener('error', (e) => {
    console.error("Video error:", e);
    changeVideo(); // Try next video on error
});

// Sound Toggle Functions
let isMuted = true;

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

// Language Switch Functions
function switchLanguage() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    updateLanguage();
}

function updateLanguage() {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[currentLang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[currentLang][key];
            } else {
                // Заменяем \n на <br> для переносов строк
                element.innerHTML = translations[currentLang][key].replace(/\\n/g, '<br>');
            }
        }
    });
}

langSwitch.addEventListener('click', switchLanguage);

// Scroll Animation
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// Portfolio Items
const portfolioItems = [
    {
        title: 'portfolio-wedding',
        video: 'assets/videos/portfolio/portfolio4.mp4',
        thumbnail: 'assets/images/portfolio/wedding.jpg'
    },
    {
        title: 'portfolio-corporate',
        video: 'assets/videos/portfolio/portfolio2.mp4',
        thumbnail: 'assets/images/portfolio/corporate.jpg'
    }
];

function createPortfolioItems() {
    const portfolioContainer = document.querySelector('#portfolio .grid');
    
    portfolioItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'fade-in';
        itemElement.innerHTML = `
            <div class="relative group cursor-pointer" onclick="playPortfolioVideo('${item.video}')">
                <video class="w-full h-64 object-cover rounded-lg" muted loop playsinline>
                    <source src="${item.video}" type="video/mp4">
                </video>
                <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                    <i class="fas fa-play text-4xl"></i>
                </div>
            </div>
            <h3 class="mt-4 text-xl font-semibold" data-lang="${item.title}">${translations[currentLang][item.title]}</h3>
        `;
        portfolioContainer.appendChild(itemElement);
    });
}

// Add video modal
function createVideoModal() {
    const modal = document.createElement('div');
    modal.id = 'videoModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 hidden flex items-center justify-center';
    modal.innerHTML = `
        <div class="relative w-full max-w-4xl mx-4">
            <button onclick="closeVideoModal()" class="absolute -top-10 right-0 text-white hover:text-gray-300">
                <i class="fas fa-times text-2xl"></i>
            </button>
            <video id="modalVideo" class="w-full rounded-lg" controls>
                <source src="" type="video/mp4">
            </video>
        </div>
    `;
    document.body.appendChild(modal);
}

function playPortfolioVideo(videoSrc) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    video.src = videoSrc;
    modal.classList.remove('hidden');
    video.play();
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    video.pause();
    video.src = '';
    modal.classList.add('hidden');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Устанавливаем начальный язык
    currentLang = 'ru';
    createPortfolioItems(); // Добавляем создание карточек портфолио
    createVideoModal(); // Добавляем создание модального окна
    initializeMedia();
    updateLanguage(currentLang);
    handleScrollAnimation();
}); 