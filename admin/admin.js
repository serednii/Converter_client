const userJson  = sessionStorage.getItem('user')
const user = JSON.parse(userJson)

if(user.role && user.name && user.email){
    headerTopUser.style.display = 'none';
}else{
    headerTopUser.style.display = 'block';
}