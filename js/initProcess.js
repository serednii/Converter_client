
import { urlMainServer, store } from "./store";
import { clearProgress } from "./uiUtils";

const initProcess = async (idQuery, numberImage, sizeFiles) => {
    try {
        const res = await fetch(`${urlMainServer}/init/init`, {
            method: 'POST',
            body: JSON.stringify({ idQuery, urlMainServer, numberImage, sizeFiles, userEmail: store.user?.email }),
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
        clearProgress();        //Розблоковуємо кнопку відправки даних
        submit.disabled = false;
        console.error('Помилка при ініціалізації запиту на сервері:', error);
    }
};

export default initProcess;