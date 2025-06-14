// Данные книг
const books = [
    {
        id: 1,
        title: "Мастер и Маргарита",
        author: "Михаил Булгаков",
        price: 1440,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "fiction",
        description: "Роман «Мастер и Маргарита» — это философская притча о добре и зле, о любви и предательстве, о свободе и несвободе человеческого духа.",
        year: 2023,
        publisher: "АСТ",
        isbn: "978-5-17-087885-7",
        pages: 480
    },
    {
        id: 2,
        title: "1984",
        author: "Джордж Оруэлл",
        price: 1140,
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "fiction",
        description: "Антиутопический роман о тоталитарном обществе, где правительство контролирует каждый аспект жизни граждан.",
        year: 2022,
        publisher: "Эксмо",
        isbn: "978-5-04-123456-7",
        pages: 320
    },
    {
        id: 3,
        title: "Атлант расправил плечи",
        author: "Айн Рэнд",
        price: 1800,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "fiction",
        description: "Философский роман о роли разума в жизни человека и о борьбе за свободу личности.",
        year: 2023,
        publisher: "Альпина Паблишер",
        isbn: "978-5-9614-1234-5",
        pages: 1368
    },
    {
        id: 4,
        title: "Богатый папа, бедный папа",
        author: "Роберт Кийосаки",
        price: 1068,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "business",
        description: "Книга о финансовой грамотности и правильном отношении к деньгам.",
        year: 2022,
        publisher: "Попурри",
        isbn: "978-985-15-1234-5",
        pages: 352
    },
    {
        id: 5,
        title: "Гарри Поттер и философский камень",
        author: "Джоан Роулинг",
        price: 1320,
        image: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "children",
        description: "Первая книга серии о юном волшебнике Гарри Поттере.",
        year: 2023,
        publisher: "РОСМЭН",
        isbn: "978-5-353-12345-6",
        pages: 432
    },
    {
        id: 6,
        title: "Властелин колец",
        author: "Джон Р.Р. Толкин",
        price: 2160,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "fiction",
        description: "Эпическая трилогия о борьбе добра со злом в мире Средиземья.",
        year: 2022,
        publisher: "АСТ",
        isbn: "978-5-17-123456-7",
        pages: 1137
    },
    {
        id: 7,
        title: "Думай и богатей",
        author: "Наполеон Хилл",
        price: 900,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "business",
        description: "Классическая книга о достижении успеха и богатства.",
        year: 2023,
        publisher: "Попурри",
        isbn: "978-985-15-2345-6",
        pages: 288
    },
    {
        id: 8,
        title: "Маленький принц",
        author: "Антуан де Сент-Экзюпери",
        price: 780,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "children",
        description: "Философская сказка о любви, дружбе и смысле жизни.",
        year: 2022,
        publisher: "Эксмо",
        isbn: "978-5-04-123456-7",
        pages: 160
    }
];

// Генерация уникального ID пользователя
function generateUserId() {
    // Используем более надежный способ генерации ID
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Получение ID пользователя
function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem('userId', userId);
        console.log('Создан новый userId:', userId);
    } else {
        console.log('Используется существующий userId:', userId);
    }
    return userId;
}

// Корзина
let cart = [];

// Загрузка корзины при старте
function loadCart() {
    const userId = getUserId();
    console.log('Загрузка корзины для userId:', userId);
    
    const savedCart = localStorage.getItem(`cart_${userId}`);
    console.log('Сохраненная корзина:', savedCart);
    
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            console.log('Загруженная корзина:', cart);
            updateCartCount();
            updateCartDisplay();
        } catch (error) {
            console.error('Ошибка при загрузке корзины:', error);
            cart = [];
        }
    } else {
        console.log('Корзина не найдена в localStorage');
        cart = [];
    }
}

// Функции для работы с корзиной
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        const existingItem = cart.find(item => item.id === bookId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...book, quantity: 1 });
        }
        console.log('Добавлена книга в корзину:', book.title);
        console.log('Текущее состояние корзины:', cart);
        saveCart();
        updateCartCount();
        showNotification('Книга добавлена в корзину');
    }
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    saveCart();
    updateCartCount();
    updateCartDisplay();
    showNotification('Книга удалена из корзины');
}

function updateQuantity(bookId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(bookId);
        return;
    }

    const item = cart.find(item => item.id === bookId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartCount();
        updateCartDisplay();
    }
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    updateCartDisplay();
    showNotification('Корзина очищена');
}

function saveCart() {
    const userId = getUserId();
    console.log('Сохранение корзины для userId:', userId);
    console.log('Текущее состояние корзины:', cart);
    
    try {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        console.log('Корзина успешно сохранена');
    } catch (error) {
        console.error('Ошибка при сохранении корзины:', error);
    }
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    if (!cartItemsContainer) {
        console.log('Элемент корзины не найден - возможно, мы не на странице корзины');
        return;
    }

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-8">
                <p class="text-coffee-medium mb-4">Ваша корзина пуста</p>
                <a href="catalog.html" class="text-coffee-dark hover:text-coffee-medium transition-colors">
                    Перейти в каталог
                </a>
            </div>
        `;
        if (subtotalElement) subtotalElement.textContent = '0 сом';
        if (shippingElement) shippingElement.textContent = '0 сом';
        if (totalElement) totalElement.textContent = '0 сом';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="bg-white rounded-lg shadow-md p-4">
            <div class="flex items-center gap-4">
                <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-cover rounded-lg">
                <div class="flex-1">
                    <h3 class="font-bold text-coffee-dark">${item.title}</h3>
                    <p class="text-coffee-medium">${item.author}</p>
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex items-center border border-coffee-medium rounded-lg">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" 
                                class="px-3 py-1 text-coffee-dark hover:bg-coffee-light">-</button>
                        <span class="px-3 py-1">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" 
                                class="px-3 py-1 text-coffee-dark hover:bg-coffee-light">+</button>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-coffee-dark">${item.price * item.quantity} сом</p>
                        <button onclick="removeFromCart(${item.id})" 
                                class="text-sm text-coffee-medium hover:text-coffee-dark transition-colors">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 360 : 0;
    const total = subtotal + shipping;

    if (subtotalElement) subtotalElement.textContent = `${subtotal} сом`;
    if (shippingElement) shippingElement.textContent = `${shipping} сом`;
    if (totalElement) totalElement.textContent = `${total} сом`;
}

// Функции для работы с каталогом
function displayBooks(books) {
    const booksGrid = document.getElementById('booksGrid');
    if (!booksGrid) return;

    booksGrid.innerHTML = '';
    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card bg-white rounded-lg shadow-custom overflow-hidden';
        bookCard.style.opacity = '0';
        bookCard.style.transform = 'translateY(20px)';
        bookCard.innerHTML = `
            <div class="relative overflow-hidden">
                <img src="${book.image}" alt="${book.title}" class="book-image w-full h-48 object-cover">
                <div class="book-overlay absolute inset-0 bg-coffee-dark bg-opacity-50 flex items-center justify-center">
                    <button onclick="addToCart(${book.id})" 
                            class="bg-coffee-medium text-white px-4 py-2 rounded-lg hover:bg-coffee-dark transition-colors">
                        В корзину
                    </button>
                </div>
            </div>
            <div class="p-4">
                <h3 class="text-lg font-bold text-coffee-dark mb-2">${book.title}</h3>
                <p class="text-coffee-medium mb-2">${book.author}</p>
                <p class="text-coffee-dark font-bold">${book.price} сом</p>
            </div>
        `;
        booksGrid.appendChild(bookCard);

        // Добавляем анимацию появления с задержкой для каждой карточки
        setTimeout(() => {
            bookCard.style.opacity = '1';
            bookCard.style.transform = 'translateY(0)';
        }, index * 100); // Задержка 100мс для каждой следующей карточки
    });
}

function openPreview(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        const modal = document.getElementById('previewModal');
        modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h2 class="text-2xl font-bold text-coffee-dark">${book.title}</h2>
                        <button onclick="closePreview()" class="text-coffee-medium hover:text-coffee-dark">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <img src="${book.image}" 
                             alt="${book.title}" 
                             class="w-full rounded-lg">
                        <div>
                            <p class="text-coffee-medium mb-4">${book.author}</p>
                            <p class="text-gray-600 mb-4">${book.description}</p>
                            <div class="space-y-2 mb-4">
                                <p><span class="font-bold">Год издания:</span> ${book.year}</p>
                                <p><span class="font-bold">Издательство:</span> ${book.publisher}</p>
                                <p><span class="font-bold">ISBN:</span> ${book.isbn}</p>
                                <p><span class="font-bold">Количество страниц:</span> ${book.pages}</p>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-2xl font-bold text-coffee-dark">${book.price} сом</span>
                                <button onclick="addToCart(${book.id})" class="bg-coffee-medium text-white px-6 py-3 rounded-lg hover:bg-coffee-dark transition-colors">
                                    Добавить в корзину
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closePreview() {
    const modal = document.getElementById('previewModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// Функции сортировки и фильтрации
function filterAndSortBooks() {
    const categorySelect = document.querySelector('select:first-of-type');
    const sortSelect = document.querySelector('select:last-of-type');
    const searchInput = document.querySelector('input[type="text"]');

    if (!categorySelect || !sortSelect || !searchInput) {
        console.error('Элементы фильтрации не найдены');
        return;
    }

    const category = categorySelect.value;
    const sort = sortSelect.value;
    const search = searchInput.value.toLowerCase().trim();

    console.log('Фильтрация:', { category, sort, search });

    let filteredBooks = [...books];

    // Фильтрация по категории
    if (category) {
        filteredBooks = filteredBooks.filter(book => book.category === category);
    }

    // Поиск по названию и автору
    if (search) {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(search) || 
            book.author.toLowerCase().includes(search)
        );
    }

    // Сортировка
    switch (sort) {
        case 'price-asc':
            filteredBooks.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredBooks.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredBooks.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
            break;
    }

    console.log('Отфильтрованные книги:', filteredBooks);
    displayBooks(filteredBooks);
}

// Уведомления
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-coffee-medium text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-full opacity-0 transition-all duration-300';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateY(full)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Функция для отображения новинок на главной странице
function displayNewBooks() {
    const newBooksGrid = document.getElementById('newBooksGrid');
    if (!newBooksGrid) return;

    // Получаем последние 4 книги из каталога
    const newBooks = books.slice(-4);

    newBooksGrid.innerHTML = newBooks.map(book => `
        <div class="bg-white rounded-lg shadow-custom card-hover" data-aos="fade-up" data-aos-delay="${newBooks.indexOf(book) * 100}">
            <div class="relative">
                <img src="${book.image}" alt="${book.title}" class="w-full h-48 object-cover rounded-t-lg">
                <div class="absolute top-2 right-2 bg-coffee-medium text-white px-2 py-1 rounded text-sm">Новинка</div>
            </div>
            <div class="p-4">
                <h3 class="text-lg font-bold text-coffee-dark mb-2">${book.title}</h3>
                <p class="text-coffee-medium mb-2">${book.author}</p>
                <div class="flex justify-between items-center">
                    <span class="text-coffee-dark font-bold">${book.price} сом</span>
                    <button onclick="addToCart(${book.id})" class="bg-coffee-medium text-white px-4 py-2 rounded hover:bg-coffee-dark transition-colors clickable">
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    console.log('Страница загружена');
    loadCart();
    displayBooks(books);
    
    // Добавляем обработчики событий для фильтров
    const categorySelect = document.querySelector('select:first-of-type');
    const sortSelect = document.querySelector('select:last-of-type');
    const searchInput = document.querySelector('input[type="text"]');

    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            filterAndSortBooks();
            // Сбрасываем анимацию при изменении фильтров
            document.querySelectorAll('.book-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            });
        });
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            filterAndSortBooks();
            // Сбрасываем анимацию при изменении сортировки
            document.querySelectorAll('.book-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            });
        });
    }
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            filterAndSortBooks();
            // Сбрасываем анимацию при поиске
            document.querySelectorAll('.book-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            });
        });
    }

    // Закрытие модального окна при клике вне его содержимого
    document.getElementById('previewModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closePreview();
        }
    });

    // Обработка отправки формы заказа
    document.getElementById('orderForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            showNotification('Корзина пуста');
            return;
        }
        showNotification('Заказ успешно оформлен!');
        clearCart();
    });

    // Добавляем обработчик перед уходом со страницы
    window.addEventListener('beforeunload', () => {
        console.log('Сохранение корзины перед уходом со страницы');
        saveCart();
    });

    // Отображаем новинки на главной странице
    displayNewBooks();
});

// Плавная навигация
document.querySelectorAll('a[href^="/"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        // Анимация перехода
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500');
    observer.observe(section);
}); 