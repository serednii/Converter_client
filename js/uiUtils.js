import { progressStatus, progressProcessing, progressUnloading, progressDownload, downloadArchive, resultImagesDiv } from './store.js'


export function setProgress(elementProgress, downloadStatus, percent) {
    progressStatus.innerText = downloadStatus
    elementProgress.style.display = "block"
    elementProgress.children[1].style.width = `${percent}%`
    elementProgress.children[2].innerText = `${percent} %`
}


export function clearProgress() {
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

// export function initEventListeners() {
//     document.getElementById('uploadForm').addEventListener('submit', handleUploadSubmit);
//     document.getElementById('languageSelect').addEventListener('change', (e) => {
//         updateLanguage(e.target.value);
//     });
// }

export function displayResults(data) {
    progressStatus.innerText = "Done";
    downloadArchive.href = data?.downloadLink;
    downloadArchive.style.display = "block";

    data?.processedImages.forEach((blobUrl) => {
        console.log(blobUrl)
        const li = document.createElement('li'); // Створюємо елемент списку
        const img = document.createElement('img'); // Створюємо елемент зображення
        img.src = blobUrl.res[0].imageBase64;
        img.alt = 'Оброблене зображення';
        img.style.maxWidth = '300px'; // Задаємо розмір для відображення
        li.appendChild(img); // Вставляємо зображення у список
        resultImagesDiv.appendChild(li); // Додаємо елемент списку у UL
    });
}

//завантажуємо файли по посиланню яке генерується автоматично коли завантажаться дані
//Прискачаванні файлів архів на сервері видаляється а якщо не скачувати то видалиться через деякий час автоматично
downloadArchive.addEventListener('click', function () {
    //Ховаємо посилання на скачування так як воно вже непотрібне
    this.style.display = "none";
})

