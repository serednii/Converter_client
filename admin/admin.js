const maxWorkServer = document.getElementById('maxWorkServer')
const numbFileForServer = document.getElementById('numbFileForServer')
const startPort = document.getElementById('startPort')

const realWorksServer = document.getElementById('realWorksServer')
const numbOfProcess = document.getElementById('numbOfProcess')
const freeServer = document.getElementById('freeServer')
const userJson = sessionStorage.getItem('user')
const user = JSON.parse(userJson)

const inputMaxWorkServer = document.querySelector('.form-control.maxWorkServer')
const inputNumbFileForServer = document.querySelector('.form-control.numbFileForServer')
const inputStartPort = document.querySelector('.form-control.startPort')

const btnMaxWorkServer = document.querySelector('.btn.maxWorkServer')
const btnNumbFileForServer = document.querySelector('.btn.numbFileForServer')
const btnStartPort = document.querySelector('.btn.startPort')


btnMaxWorkServer.addEventListener('click', (e) => {
    e.preventDefault();
    const value = inputMaxWorkServer.value;
    setAdminData({ key: 'numberFreePorts', value });
})

btnNumbFileForServer.addEventListener('click', (e) => {
    e.preventDefault();
    const value = inputNumbFileForServer.value;
    setAdminData({ key: 'numberImageToServer', value });
})

btnStartPort.addEventListener('click', (e) => {
    e.preventDefault();
    const value = inputStartPort.value;
    setAdminData({ key: 'startPorts', value });

})


function setAdminData(data) {
    try {
        fetch(`http://localhost:8000/setAdminData`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',  // Додаємо заголовок
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Сервер не відповідає')
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
            })
            .catch((error) => console.log('getAdminData', error))
    } catch (error) {
        console.log(error)
    }
}
// if(user.role && user.name && user.email){
//     headerTopUser.style.display = 'none';
// }else{
//     headerTopUser.style.display = 'block';
// }


function getAdminData() {
    try {
        fetch(`http://localhost:8000/getAdminData`, {
            method: 'POST',
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Сервер не відповідає')
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                freeServer && (freeServer.innerText = data.freePorts.length);
                realWorksServer && (realWorksServer.innerText = data.dataStore.numberFreePorts - data.freePorts.length);
                numbOfProcess && (numbOfProcess.innerText = data.workIdQuery);

                maxWorkServer && (maxWorkServer.innerText = data.dataStore.numberFreePorts);
                numbFileForServer && (numbFileForServer.innerText = data.dataStore.numberImageToServer);
                startPort && (startPort.innerText = data.dataStore.startPorts);

            })
            .catch((error) => console.log('getAdminData', error))
    } catch (error) {
        console.log(error)
    }
}



setInterval(() => {
    getAdminData()
}, 500)

