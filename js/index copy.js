const cancelButton = document.getElementById('cancelButton');
const downloadArchive = document.getElementById('download-archive');
const serverStopped = document.getElementById('server_stopped');
const pingServers = document.getElementById('ping_servers');
const submit = document.getElementById('submit')
const progressStatus = document.querySelector('.progress__status')
const progressDownload = document.querySelector('.progress__container.download')
const progressProcessing = document.querySelector('.progress__container.processing')
const progressUnloading = document.querySelector('.progress__container.unloading')
const progressTitle = document.querySelector('.progress__title');
const imageInput = document.getElementById('imageInput');
const resultImagesDiv = document.getElementById('resultImages');
const headerTopUserNoAuthorization = document.querySelector('.header__top-user__noauthorization');
const headerTopUserAuthorization = document.querySelector('.header__top-user__authorization')
const buttonExit = document.querySelector('.user__exit')
const linkAdmin = document.querySelector('.header__top-admin .admin')
const linkUser = document.querySelector('.header__top-admin .user')

const urlMainServer = 'http://localhost:8000';
// const urlMainServer = 'https://sharpiramainserver-production.up.railway.app'
// const urlMainServer = 'https://renewed-peace-production.up.railway.app'

let controller = null;
let idSetInterval = null;
let idQuery = 0;
let downloadStatus = "";
let percentDownloading = "";
let user = null;

// Мовні ресурси
const languageTexts = {
    uk: {
        title: "Завантажте зображення",
        processTypeLabel: "Виберіть тип обробки:",
        brightness: "Яскравість",
        blur: "Розмиття",
        resize: "Змінити розмір",
        grayscale: "Чорно-біле",
        rotate: "Повернути на 90°",
        contrast: "Контраст",
        crop: "Обрізати",
        upload: "Завантажити",
        cancel: "Скасувати обробку",
        progress: "Прогрес",
        download: "Завантажити архів",
        resultTitle: "Результат:",
        chooseLanguage: "Виберіть мову",  // Додано
    },
    en: {
        title: "Upload Images",
        processTypeLabel: "Choose process type:",
        brightness: "Brightness",
        blur: "Blur",
        resize: "Resize",
        grayscale: "Grayscale",
        rotate: "Rotate 90°",
        contrast: "Contrast",
        crop: "Crop",
        upload: "Upload",
        cancel: "Cancel Processing",
        progress: "Progress",
        download: "Download Archive",
        resultTitle: "Result:",
        chooseLanguage: "Choose language",  // Додано
    },
    cz: {
        title: "Nahrát obrázky",
        processTypeLabel: "Vyberte typ zpracování:",
        brightness: "Jas",
        blur: "Rozmazání",
        resize: "Změnit velikost",
        grayscale: "Černobílý",
        rotate: "Otočit o 90°",
        contrast: "Kontrast",
        crop: "Oříznout",
        upload: "Nahrát",
        cancel: "Zrušit zpracování",
        progress: "Průběh",
        download: "Stáhnout archiv",
        resultTitle: "Výsledek:",
        chooseLanguage: "Vyberte jazyk",  // Додано
    },
};

// Функція для зміни мови
function changeLanguage(lang) {
    document.querySelector("h1").textContent = languageTexts[lang].title;
    document.querySelector(
        'label[for="processType"]'
    ).textContent = languageTexts[lang].processTypeLabel;
    document.querySelector(
        '#processType option[value="brightness"]'
    ).textContent = languageTexts[lang].brightness;
    document.querySelector('#processType option[value="blur"]').textContent =
        languageTexts[lang].blur;
    document.querySelector(
        '#processType option[value="resize"]'
    ).textContent = languageTexts[lang].resize;
    document.querySelector(
        '#processType option[value="grayscale"]'
    ).textContent = languageTexts[lang].grayscale;
    document.querySelector(
        '#processType option[value="rotate"]'
    ).textContent = languageTexts[lang].rotate;
    document.querySelector(
        '#processType option[value="contrast"]'
    ).textContent = languageTexts[lang].contrast;
    document.querySelector('#processType option[value="crop"]').textContent =
        languageTexts[lang].crop;
    document.querySelector("button[type='submit']").textContent =
        languageTexts[lang].upload;
    document.querySelector("#cancelButton").textContent =
        languageTexts[lang].cancel;
    // document.querySelector(".w3-blue")?.textContent =
    //     languageTexts[lang].progress;
    document.querySelector("#download-archive").textContent =
        languageTexts[lang].download;
    document.querySelector(".title-result").textContent =
        languageTexts[lang].resultTitle;
    document.querySelector('label[for="languageSelect"]').textContent =
        languageTexts[lang].chooseLanguage; // Додано
}

// Додаємо подію для зміни мови
document.getElementById("languageSelect").addEventListener("change", function () {
    changeLanguage(this.value);
});



document.addEventListener('DOMContentLoaded', function () {
    const processType = document.getElementById('processType');
    const optionsDivs = document.querySelectorAll('.options');

    const showOptions = (type) => {
        optionsDivs.forEach((div) => div.style.display = 'none');

        switch (type) {
            case 'resize':
                document.getElementById('resizeOptions').style.display = 'block';
                break;
            case 'rotate':
                document.getElementById('rotateOptions').style.display = 'block';
                break;
            case 'blur':
                document.getElementById('blurOptions').style.display = 'block';
                break;
            case 'brightness':
                document.getElementById('brightnessOptions').style.display = 'block';
                break;
            case 'contrast':
                document.getElementById('contrastOptions').style.display = 'block';
                break;
            case 'crop':
                document.getElementById('cropOptions').style.display = 'block';
                break;
        }
    };

    processType.addEventListener('change', (e) => {
        showOptions(e.target.value);
    });

    showOptions(processType.value);
});




import './select_action.js';

//***************************ADMIN********************** */

// log out
buttonExit.addEventListener('click', () => {
    sessionStorage.clear('user');
    checkAuthorization()
})

// перевірка авторизації
function checkAuthorization() {
    const userJson = sessionStorage.getItem('user')
    user = JSON.parse(userJson)
    headerTopUserNoAuthorization.style.display = 'block';
    headerTopUserAuthorization.style.display = "none";
    linkAdmin.style.display = 'none';
    linkUser.style.display = 'none';

    if (user && user.role && user.name && user.email) {
        user.role === "admin" && (linkAdmin.style.display = 'block');
        user.role === "user" && (linkUser.style.display = 'block');
        headerTopUserNoAuthorization.style.display = 'none';
        headerTopUserAuthorization.style.display = 'block';
        headerTopUserAuthorization.children[0].innerText = "Привіт " + user?.name
    }
}

checkAuthorization()
//***************************ADMIN********************** */

//завантажуємо файли по посиланню яке генерується автоматично коли завантажаться дані
//Прискачаванні файлів архів на сервері видаляється а якщо не скачувати то видалиться через деякий час автоматично
downloadArchive.addEventListener('click', function () {
    //Ховаємо посилання на скачування так як воно вже непотрібне
    this.style.display = "none";
})


//При виборі файлів користувачем перевіряємо їх обєм  
imageInput.addEventListener('change', function () {
    //всі файли які ми вибрали
    const files = this.files;

    if (!user) {
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

pingServers.addEventListener('click', async () => {
    for (let i = 8100; i <= 8120; i++) {
        try {
            fetch(`http://localhost:${i}/status`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Сервер не відповідає')
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data.st + " " + 'http://localhost' + i)
                }).catch(() => console.log('Сервер не відповідає' + 'http://localhost' + i + ' error'))
        } catch (error) {
            console.log('http://localhost' + i + 'error')
        }
    }
})

// serverStopped.addEventListener('click', async () => {
//     try {
//         const pauseSend = document.getElementById('pause_send')
//         console.log(pauseSend.value)


//         const res = await fetch(`${urlMainServer}/other/killer`, {
//             method: 'POST',
//             body: JSON.stringify({ pause: pauseSend.value }),
//             headers: {
//                 'Content-Type': 'application/json',  // Додаємо заголовок
//             },
//         })


//         if (!res.ok) {
//             throw new Error('При остановке сервера произошла ошибка')
//         }

//         const data = await res.json()
//         console.log(data)

//     } catch (error) {
//         console.log(error)
//     }
// })





//Відміняємо обробку
cancelButton.addEventListener('click', () => {
    controller.abort(); // Скасовуємо запит
    //Зупиняємо таймер
    clearInterval(idSetInterval);
    //Очишчаємо прогрес та інші поля
    clearProgress()
    //Розблоковуємо кнопку відправки даних
    submit.disabled = false;
    console.log('Запит скасовано', idQuery);

    fetch(`${urlMainServer}/other/abort`, {
        method: 'POST',
        body: JSON.stringify({ idQuery }),
        headers: {
            'Content-Type': 'application/json',  // Додаємо заголовок
        },
    }).then((res) => {
        console.log('Запит скасовано на сервері')
    }).catch((error) => {
        console.error('Помилка при скасуванні запиту на сервері:', error)
    })

});

const initProgress = async (idQuery, numberImage, sizeFiles) => {
    try {
        const res = await fetch(`${urlMainServer}/init/init`, {
            method: 'POST',
            body: JSON.stringify({ idQuery, urlMainServer, numberImage, sizeFiles, userEmail: user?.email }),
            headers: {
                'Content-Type': 'application/json',  // Додаємо заголовок
            },
        });

        if (!res.ok) {
            throw new Error(`Помилка: ${res.status} ${res.statusText}`);
        }
        return await res.json();

        // console.log('Дані ініційовано');
    } catch (error) {
        alert('Помилка на сервері спробуйте пізніше')
        clearProgress()
        //Розблоковуємо кнопку відправки даних
        submit.disabled = false;
        console.error('Помилка при ініціалізації запиту на сервері:', error);
    }
};

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
        idQuery = Math.floor(100000 + Math.random() * 900000);
        console.log(idQuery);
        //Додаємо id до даних які пошлемо на сервер
        formData.append('idQuery', idQuery);
        formData.append('userEmail', user?.email);


        //Відправляємо попередній запит на сервер який нам створить робочі сервера
        //по замовчування на 1 сервер 10 фото
        //Якщо буде вільний хоть один сервер то процес буде дозволено
        //дані можна опрацьовувати і на одному робочому сервері але це буде повільніше
        const sizeFiles = Array.from(imageInput.files).reduce((a, file) => a + file.size, 0)
        const numberImage = imageInput.files.length
        const responseInit = await initProgress(idQuery, numberImage, sizeFiles);

        //Якщо існує хоть один вільний порт то дозволяємо відправку даних
        if (responseInit.ports >= 1) {
            controller = new AbortController();

            //Запускємо запити до ендпойнту "/status", який періодично питається у сервера про стан роботи 
            checkProcessingStatus(idQuery);
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

    // signal: controller.signal

});


async function sendData(formData) {
    try {
        resultImagesDiv.innerHTML = ''; // Очищуємо попередні результати
        //Заблоковуємо кнопку відправки даних
        submit.disabled = true;
        clearProgress();

        // Відправка даних на сервер через fetch
        console.log('strat strat strat strat strat strat strat strat ')
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${urlMainServer}/images/upload-multiple`, true);

        controller.signal.addEventListener('abort', () => {
            xhr.abort();
            console.log('Request aborted');
            progressStatus.innerText = "Скасовано";
        });

        // Відстеження прогресу завантаження на сервер
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                percentDownloading = parseInt(((event.loaded / event.total) * 100));
                setProgress(progressUnloading, downloadStatus, percentDownloading)
            }
        });
        // Відправка даних на сервер

        xhr.addEventListener('progress', (event) => {
            if (event.lengthComputable) {

                percentDownloading = parseInt(((event.loaded / event.total) * 100));
                setProgress(progressDownload, downloadStatus, percentDownloading)


                progressProcessing.children[1].style.width = '100%'
                progressProcessing.children[2].innerText = '100 %'
            }
        });

        // Обробка помилок
        xhr.onerror = (error) => {
            console.error('Помилка завантаження');
            alert('Помилка завантаження');
            clearProgress();
            clearInterval(idSetInterval);
            //Розблоковуємо кнопку відправки даних
            submit.disabled = false;
            progressStatus.innerText = "Помилка завантаження";
            throw new Error('Network error', error);
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                //Зупиняємо запит status
                clearInterval(idSetInterval);
                //Розблоковуємо кнопку відправки даних
                submit.disabled = false;
                //Перетворюємо дані із Json формату в обєкт
                const data = JSON.parse(xhr.response);
                console.log(data);
                //Виводимо результат
                viveResult(data);
            }
        };


        xhr.send(formData);

        // Отримання оброблених зображень як Blob

    } catch (error) {
        console.error('Сталася помилка:', error);
    }
}

async function checkProcessingStatus(idQuery) {
    idSetInterval = setInterval(async () => {
        // console.log('setInterval')
        try {

            const response = await fetch(`${urlMainServer}/other/status`, {
                method: 'POST',
                body: JSON.stringify({ idQuery }),
                headers: {
                    'Content-Type': 'application/json',  // Додаємо заголовок
                },
            })

            if (!response.ok) {
                return;
            }

            let result = await response.json();

            // console.log('status', status);
            let percent = Math.round((100 / result.total) * result.progress);

            if (typeof percent !== "number" || Number.isNaN(percent) || percent < 0 || percent > 100) {
                percent = 0;
            }

            downloadStatus = result.processingStatus;


            if (downloadStatus === "processing images") {
                setProgress(progressProcessing, downloadStatus, percent)
            }
            console.log(result)



        } catch (error) {
            console.error('Помилка під час перевірки статусу обробки112:', error);
            clearInterval(idSetInterval);  // Зупиняємо інтервал у разі помилки
        }

        // Якщо всі завдання завершені, зупиняємо перевірку статусу

    }, 700); // Запитуємо статус кожні 2 секунди
}



function viveResult(data) {
    progressStatus.innerText = "Done";
    downloadArchive.href = data?.downloadLink;
    downloadArchive.style.display = "block";

    data.processedImages.forEach((blobUrl) => {
        console.log(blobUrl)
        const li = document.createElement('li'); // Створюємо елемент списку
        const img = document.createElement('img'); // Створюємо елемент зображення
        img.src = blobUrl.res[0].imageBase64;
        // img.src = blobUrl.img.data;

        img.alt = 'Оброблене зображення';
        img.style.maxWidth = '300px'; // Задаємо розмір для відображення
        li.appendChild(img); // Вставляємо зображення у список
        resultImagesDiv.appendChild(li); // Додаємо елемент списку у UL
    });

}


function clearProgress() {
    progressStatus.innerText = "Let's start";

    progressUnloading.style.display = "none";
    progressProcessing.style.display = "none";
    progressDownload.style.display = "none";
    downloadArchive.style.display = "none";

    progressUnloading.children[1].style.width = '0';
    progressUnloading.children[2].innerText = '0%';

    progressProcessing.children[1].style.width = '0';
    progressProcessing.children[2].innerText = '0%';

    progressDownload.children[1].style.width = '0';
    progressDownload.children[2].innerText = '0%';
}

function setProgress(elementProgress, downloadStatus, percent) {
    progressStatus.innerText = downloadStatus
    elementProgress.style.display = "block"
    elementProgress.children[1].style.width = `${percent}%`
    elementProgress.children[2].innerText = `${percent} %`
}
