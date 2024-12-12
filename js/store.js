const store = {
    user: null,
    controller: null,
    idSetInterval: null,
    idQuery: 0,
    downloadStatus: "",
    percentDownloading: "",
};

// Select DOM elements
const downloadArchive = document.getElementById('download-archive');
const submit = document.getElementById('submit');
const progressStatus = document.querySelector('.progress__status');
const progressDownload = document.querySelector('.progress__container.download');
const progressProcessing = document.querySelector('.progress__container.processing');
const progressUnloading = document.querySelector('.progress__container.unloading');
const progressTitle = document.querySelector('.progress__title');
const imageInput = document.getElementById('imageInput');
const resultImagesDiv = document.getElementById('resultImages');
// const urlMainServer = 'http://localhost:8000';
const urlMainServer = 'https://converterserver-production.up.railway.app'
// const urlMainServer = 'https://renewed-peace-production.up.railway.app'

// Export elements
export {
    downloadArchive,
    submit,
    progressStatus,
    progressDownload,
    progressProcessing,
    progressUnloading,
    progressTitle,
    imageInput,
    resultImagesDiv,
    store,
    urlMainServer,
};


