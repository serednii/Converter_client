
import {

    downloadArchive,
    pingServers,
    progressTitle,
    imageInput,
    buttonExit,
    store,
} from './store.js';

import checkAuthorization from './authAdmin.js';
import './submitUploadForm.js';
import './language.js';
import './select_action.js';

//***************************ADMIN********************** */

// log out
buttonExit.addEventListener('click', () => {
    sessionStorage.clear('user');
    checkAuthorization();
})

// перевірка авторизації
checkAuthorization()
//***************************ADMIN********************** */




//При виборі файлів користувачем перевіряємо їх обєм  
imageInput.addEventListener('change', function () {
    //всі файли які ми вибрали
    const files = this.files;
    console.log(store.user)
    if (!store.user) {
        if (files.length > 1) {
            alert('Для обробки більшої кількості файлів потрібно зареєструватися')
            location.reload()
        }
    }

    //Загалтьний обєм в байтах
    const totalSize = Array.from(files).reduce((a, e) => a + e.size, 0)
    //Переводимо в мегабайти
    const totalMb = ((totalSize / 1024) / 1024).toFixed(2);
    //Виводимо на екран
    progressTitle.innerText = `Прогрес totalSize ${totalMb} Mb`;
    console.log(totalSize, totalMb);

    //переввіряємо на максимально допустимий розмір
    // if (totalSize > 42_428_800) {
    //     alert(`Максимальний розмір файлів небільше 40 мега байт а ви вибрали ${totalMb} Mb`)
    //Перезавантажуємо сторінку щоб очистити input
    //     location.reload()
    //     return
    // }
})


