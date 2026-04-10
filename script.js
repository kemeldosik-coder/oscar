// Конфигурация данных
const nominations = [
    { id: "otkrytie", title: "Открытие года", candidates: ["Участник A", "Участник B", "Участник C"] },
    { id: "activist", title: "Лучший Активист", candidates: ["Участник D", "Участник E", "Участник F"] },
    { id: "sportsman", title: "Лучший спортсмен", candidates: ["Участник G", "Участник H", "Участник I"] },
    { id: "image", title: "Лучший сценический образ", candidates: ["Участник J", "Участник K", "Участник L"] },
    { id: "vocal", title: "Лучший Вокал", candidates: ["Участник M", "Участник N", "Участник O"] },
    { id: "union", title: "Студенческое объединение", candidates: ["Объединение 1", "Объединение 2", "Объединение 3"] },
    { id: "actor", title: "Лучший Актер", candidates: ["Участник P", "Участник Q", "Участник R"] },
    { id: "event", title: "Событие года", candidates: ["Мероприятие 1", "Мероприятие 2", "Мероприятие 3"] },
    { id: "volunteer", title: "Лучший Волонтер", candidates: ["Участник S", "Участник T", "Участник U"] },
    { id: "content", title: "Лучший Контент Мейкер", candidates: ["Участник V", "Участник W", "Участник X"] }
];

// Генерация карточек номинаций
const nomGrid = document.getElementById('nominations-list');
nominations.forEach(nom => {
    const card = document.createElement('div');
    card.className = 'nom-card reveal';
    card.innerHTML = `<h3>${nom.title}</h3>`;
    nomGrid.appendChild(card);
});

// Генерация формы голосования
const votingSteps = document.getElementById('voting-steps');
nominations.forEach(nom => {
    const group = document.createElement('div');
    group.className = 'nomination-group';
    group.innerHTML = `
        <h3>${nom.title}</h3>
        <div class="candidates-list">
            ${nom.candidates.map(candidate => `
                <div class="candidate-option">
                    <input type="radio" name="${nom.id}" value="${candidate}" id="${nom.id}-${candidate}" required>
                    <label for="${nom.id}-${candidate}">${candidate}</label>
                </div>
            `).join('')}
        </div>
    `;
    votingSteps.appendChild(group);
});

// Плавная анимация появления (Scroll Reveal)
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        var windowHeight = window.innerHeight;
        var elementTop = el.getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
window.onload = reveal;

// Таймер обратного отсчета
const countDownDate = new Date("May 25, 2024 18:00:00").getTime();
const timerFunc = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("mins").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    if (distance < 0) {
        clearInterval(timerFunc);
        document.getElementById("timer").innerHTML = "СОБЫТИЕ НАЧАЛОСЬ";
    }
}, 1000);

// Обработка формы и отправка в Google Таблицу
const voteForm = document.getElementById('voteForm');
const scriptURL = 'ТВОЙ_GOOGLE_SCRIPT_URL'; // ЗАМЕНИТЬ ПОСЛЕ НАСТРОЙКИ

voteForm.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = 'Отправка...';
    submitBtn.disabled = true;

    const formData = new FormData(voteForm);
    
    // Если скрипт настроен, используй fetch. Пока сделаем имитацию:
    setTimeout(() => {
        console.log("Данные для отправки:", Object.fromEntries(formData));
        document.getElementById('voteForm').classList.add('hidden');
        document.getElementById('successMessage').classList.remove('hidden');
        window.scrollTo({ top: document.getElementById('voting').offsetTop - 100, behavior: 'smooth' });
    }, 1500);

    /* 
    fetch(scriptURL, { method: 'POST', body: formData})
        .then(response => {
            document.getElementById('voteForm').classList.add('hidden');
            document.getElementById('successMessage').classList.remove('hidden');
        })
        .catch(error => console.error('Ошибка!', error.message));
    */
});

// Burger menu logic
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    // Можно добавить стили для .nav-links.active в CSS
});
