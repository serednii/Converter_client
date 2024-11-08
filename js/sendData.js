import { setProgress, clearProgress, displayResults } from './uiUtils.js';
import { resultImagesDiv, urlMainServer, store, progressUnloading, progressDownload, progressProcessing } from './store.js';
// export default async function initUploadProcess(formData) {
//     const controller = new AbortController();
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', `${urlMainServer}/images/upload-multiple`, true);

//     controller.signal.addEventListener('abort', () => {
//         xhr.abort();
//         console.log('Request aborted');
//     });

//     xhr.upload.addEventListener('progress', (event) => {
//         setProgress('uploading', event);
//     });

//     xhr.addEventListener('load', () => {
//         if (xhr.status === 200) {
//             displayResults(JSON.parse(xhr.response));
//         } else {
//             console.error('Error uploading files');
//         }
//     });

//     xhr.onerror = () => {
//         console.error('Upload error');
//         clearProgress();
//     };
//     xhr.send(formData);
// }

export default async function sendData(formData) {
    try {
        resultImagesDiv.innerHTML = ''; // Очищуємо попередні результати
        //Заблоковуємо кнопку відправки даних
        submit.disabled = true;
        clearProgress();

        // Відправка даних на сервер через fetch
        console.log('strat strat strat strat strat strat strat strat ')
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${urlMainServer}/images/upload-multiple`, true);

        store.controller.signal.addEventListener('abort', () => {
            xhr.abort();
            console.log('Request aborted');
            progressStatus.innerText = "Скасовано";
        });

        // Відстеження прогресу завантаження на сервер
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                store.percentDownloading = parseInt(((event.loaded / event.total) * 100));
                setProgress(progressUnloading, store.downloadStatus, store.percentDownloading)
            }
        });
        // Відправка даних на сервер

        xhr.addEventListener('progress', (event) => {
            if (event.lengthComputable) {

                store.percentDownloading = parseInt(((event.loaded / event.total) * 100));
                setProgress(progressDownload, store.downloadStatus, store.percentDownloading)


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
                clearInterval(store.idSetInterval);
                //Розблоковуємо кнопку відправки даних
                submit.disabled = false;
                //Перетворюємо дані із Json формату в обєкт
                const data = JSON.parse(xhr.response);
                console.log(data);
                //Виводимо результат
                displayResults(data);
            }
        };


        xhr.send(formData);

        // Отримання оброблених зображень як Blob

    } catch (error) {
        console.error('Сталася помилка:', error);
    }
}
