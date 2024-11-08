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
const serverStopped = document.getElementById('server_stopped');
const pingServers = document.getElementById('ping_servers');
const submit = document.getElementById('submit');
const progressStatus = document.querySelector('.progress__status');
const progressDownload = document.querySelector('.progress__container.download');
const progressProcessing = document.querySelector('.progress__container.processing');
const progressUnloading = document.querySelector('.progress__container.unloading');
const progressTitle = document.querySelector('.progress__title');
const imageInput = document.getElementById('imageInput');
const resultImagesDiv = document.getElementById('resultImages');
const buttonExit = document.querySelector('.user__exit');
const urlMainServer = 'http://localhost:8000';


// Export elements
export {
    downloadArchive,
    serverStopped,
    pingServers,
    submit,
    progressStatus,
    progressDownload,
    progressProcessing,
    progressUnloading,
    progressTitle,
    imageInput,
    resultImagesDiv,
    buttonExit,
    store,
    urlMainServer,
};


// const urlMainServer = 'https://sharpiramainserver-production.up.railway.app'
// const urlMainServer = 'https://renewed-peace-production.up.railway.app'
// export default store 