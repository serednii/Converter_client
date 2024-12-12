import { store, urlMainServer, progressProcessing } from "./store.js";
import { setProgress } from "./uiUtils.js";

export default async function checkProcessingStatus(idQuery) {
    store.idSetInterval = setInterval(async () => {
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

            const result = await response.json();

            // console.log('status', status);
            let percent = Math.round((100 / result.total) * result.progress);

            if (typeof percent !== "number" || Number.isNaN(percent) || percent < 0 || percent > 100) {
                percent = 0;
            }

            store.downloadStatus = result.processingStatus;

            if (store.downloadStatus === "processing images") {
                setProgress(progressProcessing, store.downloadStatus, percent)
            }
            console.log(result)



        } catch (error) {
            console.error('Помилка під час перевірки статусу обробки112:', error);
            clearInterval(store.idSetInterval);  // Зупиняємо інтервал у разі помилки
        }

        // Якщо всі завдання завершені, зупиняємо перевірку статусу

    }, 700); // Запитуємо статус кожні 2 секунди
}