import { languageTexts } from './languageTexts.js';

export function setProgress(stage, event) {
    const percent = Math.round((event.loaded / event.total) * 100);
    document.querySelector(`.progress__container.${stage} .progress__status`).innerText = `${percent}%`;
}

export function clearProgress() {
    document.querySelectorAll('.progress__container').forEach(container => {
        container.querySelector('.progress__status').innerText = '0%';
    });
}

export function displayResults(data) {
    const resultDiv = document.getElementById('resultImages');
    data.processedImages.forEach(imgUrl => {
        const img = document.createElement('img');
        img.src = imgUrl;
        img.style.maxWidth = '300px';
        resultDiv.appendChild(img);
    });
}

export function initEventListeners() {
    document.getElementById('uploadForm').addEventListener('submit', handleUploadSubmit);
    document.getElementById('languageSelect').addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });
}

function updateLanguage(lang) {
    document.querySelector('h1').textContent = languageTexts[lang].title;
    // оновлення інших текстів
}
