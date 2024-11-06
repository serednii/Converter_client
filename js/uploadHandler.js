import { setProgress, clearProgress, displayResults } from './uiUtils.js';

export async function initUploadProcess(formData) {
    const controller = new AbortController();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${urlMainServer}/images/upload-multiple`, true);

    controller.signal.addEventListener('abort', () => {
        xhr.abort();
        console.log('Request aborted');
    });

    xhr.upload.addEventListener('progress', (event) => {
        setProgress('uploading', event);
    });

    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            displayResults(JSON.parse(xhr.response));
        } else {
            console.error('Error uploading files');
        }
    });

    xhr.onerror = () => {
        console.error('Upload error');
        clearProgress();
    };

    xhr.send(formData);
}
