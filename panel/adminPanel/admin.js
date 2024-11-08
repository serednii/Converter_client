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

const dataUsers = document.querySelector('#data-users')

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
        fetch(`http://localhost:8000/admin/setAdminData`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',  // Додаємо заголовок
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Сервер неотвечает')
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


function getAdminData() {
    try {
        fetch(`http://localhost:8000/admin/getAdminData`, {
            method: 'POST',
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Сервер неотвечает')
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                printParameters(data)
                printUsers(data)
            })
            .catch((error) => console.log('getAdminData', error))
    } catch (error) {
        console.log(error)
    }
}

function printParameters(data) {
    freeServer && (freeServer.innerText = data.freePorts.length);
    realWorksServer && (realWorksServer.innerText = data.dataStore.numberFreePorts - data.freePorts.length);
    numbOfProcess && (numbOfProcess.innerText = data.workIdQuery);
    maxWorkServer && (maxWorkServer.innerText = data.dataStore.numberFreePorts);
    numbFileForServer && (numbFileForServer.innerText = data.dataStore.numberImageToServer);
    startPort && (startPort.innerText = data.dataStore.startPorts);
}

function printUsers(data) {
    dataUsers.innerHTML = ''
    data?.users.map(({ name, email, role, history }) => {
        const tableTr = history.map(({ date, numberImage, sizeFiles }, index) => {
            return `
      <tr>
        <th scope="row">${index + 1}</th>
        <td class="">${date}</td>
        <td id="freeServer">${numberImage}</td>
        <td id="freeServer">${sizeFiles}</td>
      </tr>
    `
        })

        const tableHistory = `
<td colspan="4" class="description__settings">
<p class="text-center pt-4">Статистика запитів</p>
<table class="table data-users_static table-bordered table-hover">
<thead class="thead-dark">
  <tr>
    <th scope="col">#</th>
    <th scope="col">Дата</th>
    <th scope="col">Кількість файлів</th>
    <th scope="col">Об'єм файлів</th>
  </tr>
</thead>
<tbody>
 ${tableTr.join('')}
</tbody>
</table>
</td>
`

        const tableUser = `  
<table class="table data-users__teable table-bordered table-hover">
          
        <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Імя</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td class="description__settings">${name}</td>
              <td id="freeServer">${email}</td>
              <td id="freeServer">${role}</td>
            </tr>
            <tr>
                ${history.length > 0 ? tableHistory : ""}
            </tr>
          </tbody>
        </table>

`
        dataUsers.insertAdjacentHTML("beforeend", tableUser);
    })

}


setInterval(() => {
    getAdminData()
}, 1000)

