const dataUsers = document.querySelector('#data-users')
const userJson = sessionStorage.getItem('user')
const user = JSON.parse(userJson)
console.log(user)

function getAdminData() {
  try {
    fetch(`http://localhost:8000/user/getUserData`, {
      method: 'POST',
      body: JSON.stringify({ email: user.email }),
      headers: {
        'Content-Type': 'application/json',  // Přidání záhlaví
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Server neodpovídá')
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
        printUsers(data)
      })
      .catch((error) => console.log('getAdminData', error))
  } catch (error) {
    console.log(error)
  }
}

function printUsers(data) {
  dataUsers.innerHTML = '';
  console.log(data);
  const { name, email, role, history } = data.user


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
<p class="text-center pt-4">Statistika požadavků</p>
<table class="table data-users_static table-bordered table-hover">
<thead class="thead-dark">
  <tr>
    <th scope="col">#</th>
    <th scope="col">Datum</th>
    <th scope="col">Počet souborů</th>
    <th scope="col">Velikost souborů</th>
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
              <th scope="col">Jméno</th>
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

}


// setInterval(() => {
getAdminData()
// }, 1000)
