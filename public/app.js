

const tg = window.Telegram.WebApp;


tg.expand();

const user = tg.initDataUnsafe.user;


if (user) {
    console.log('👤 Пользователь:', user);
   

    const header = document.querySelector('header h1');

    
    if (header && user.first_name) {
        header.innerHTML = `🎉 Привет, ${user.first_name}!`;
    }
}


document.getElementById('demo-button').addEventListener('click', function() {

    const resultArea = document.getElementById('result');
    
    resultArea.innerHTML = `
        <h3>🎊 Поздравляю!</h3>
        <p>Ты только что взаимодействовал с Mini App!</p>
        <p><small>ID пользователя: ${user ? user.id : 'неизвестен'}</small></p>
    `;
  
    resultArea.classList.add('show');

    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
});

function closeApp() {
    tg.close();
}

console.log('🚀 Mini App загружен!');
