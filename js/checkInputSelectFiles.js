import {
    progressTitle,
    imageInput,
    store,
} from './store.js';

imageInput.addEventListener('change', function (event) {
    //всі файли які ми вибрали
    const files = Array.from(event.target.files);
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = "";  // Очищуємо повідомлення про помилку
    
    console.log(store.user)
    if (!store.user) {
        if (files.length > 1) {
            alert('Для обробки більшої кількості файлів потрібно зареєструватися')
            event.target.value = "";  // Очищуємо вибір файлу
        }
    }

    files.forEach(file =>{
        if (files) {
          // Перевіряємо MIME-тип файлу
          if (!file.type.startsWith('image/')) {
            errorMessage.textContent = "Будь ласка, оберіть тільки зображення.";
            event.target.value = "";  // Очищуємо вибір файлу
          }
        }
    })

    //Загалтьний обєм в байтах
    const totalSize = files.reduce((a, e) => a + e.size, 0)
    //Переводимо в мегабайти
    const totalMb = ((totalSize / 1024) / 1024).toFixed(2);
    //Виводимо на екран
    progressTitle.innerText = `Прогрес totalSize ${totalMb} Mb`;
    console.log(totalSize, totalMb);

    //переввіряємо на максимально допустимий розмір
    // if (totalSize > 42_428_800) {
    //     alert(`Максимальний розмір файлів небільше 40 мега байт а ви вибрали ${totalMb} Mb`)
    //       event.target.value = "";  // Очищуємо вибір файлу
    //     return
    // }
})