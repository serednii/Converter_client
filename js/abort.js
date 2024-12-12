
const cancelButton = document.getElementById('cancelButton');
import { store } from './store.js';
import { clearProgress } from './uiUtils.js';

cancelButton.addEventListener('click', () => {
    store.controller.abort(); // Скасовуємо запит
    //Зупиняємо таймер
    clearInterval(store.idSetInterval);
    //Очишчаємо прогрес та інші поля
    clearProgress();    //Розблоковуємо кнопку відправки даних
    submit.disabled = false;
    console.log('Запит скасовано', store.idQuery);

    fetch(`${urlMainServer}/other/abort`, {
        method: 'POST',
        body: JSON.stringify({ idQuery: store.idQuery }),
        headers: {
            'Content-Type': 'application/json',  // Додаємо заголовок
        },
    }).then((res) => {
        console.log('Запит скасовано на сервері')
    }).catch((error) => {
        console.error('Помилка при скасуванні запиту на сервері:', error)
    })

});

