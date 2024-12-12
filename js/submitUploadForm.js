
import { store } from './store.js';
import sendData from './sendData.js';
import checkProcessingStatus from './checkProcessingStatus.js'
import initProcess from './initProcess.js'

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {

        //Дістаємо форму із HTML
        const form = document.getElementById("uploadForm")

        //Створюємо обєкт FormData і передаємо в конструктор форму
        const formData = new FormData(form);

        //Дістаємо елемент UL куди будемо скидувати готові фото
        const resultImagesDiv = document.getElementById('resultImages');
        //Очишщаємо його
        resultImagesDiv.innerHTML = ''; // Очищуємо попередні результат

        //Генеруємо унікальний id код для кожного запиту, щоб розділити запити на сервері
        store.idQuery = Math.floor(100000 + Math.random() * 900000);
        console.log(store.idQuery);
        //Додаємо id до даних які пошлемо на сервер
        formData.append('idQuery', store.idQuery);
        formData.append('userEmail', store.user?.email);

        //Відправляємо попередній запит на сервер який нам створить робочі сервера
        //по замовчування на 1 сервер 10 фото
        //Якщо буде вільний хоть один сервер то процес буде дозволено
        //дані можна опрацьовувати і на одному робочому сервері але це буде повільніше
        const sizeFiles = Array.from(imageInput.files).reduce((a, file) => a + file.size, 0)
        const numberImage = imageInput.files.length
        const responseInit = await initProcess(store.idQuery, numberImage, sizeFiles);

        //Якщо існує хоть один вільний порт то дозволяємо відправку даних
        if (responseInit.ports >= 1) {
            store.controller = new AbortController();

            //Запускємо запити до ендпойнту "/status", який періодично питається у сервера про стан роботи 
            checkProcessingStatus(store.idQuery);
            //Відправляємо дані
            sendData(formData);
        } else {
            //якщо Немає вільних серверів виводимо повідомлення
            alert('Немає вільних серверів, Спробуйте пізніше');
            //Очишчаємо прогрес та інші поля
            clearProgress();
            submit.disabled = false;
            console.log('Немає вільних серверів')
        }

    } catch (error) {
        console.log(error)
    }

});
