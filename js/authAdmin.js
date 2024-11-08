import  {store}  from './store.js'
// let user = store.user

function checkAuthorization() {
    console.log('checkAuthorization')
    const userJson = sessionStorage.getItem('user')
    store.user = JSON.parse(userJson)

    const userAuthElem = document.querySelector('.header__top-user__authorization')
    const userNoAuthElem = document.querySelector('.header__top-user__noauthorization');

    const adminLink = document.querySelector('.header__top-admin .admin')
    const userLink = document.querySelector('.header__top-admin .user')

    userNoAuthElem.style.display = 'block';
    userAuthElem.style.display = "none";
    adminLink.style.display = 'none';
    userLink.style.display = 'none';

    if (store.user && store.user.role && store.user.name && store.user.email) {
        store.user.role === "admin" && (adminLink.style.display = 'block');
        store.user.role === "user" && (userLink.style.display = 'block');
        userNoAuthElem.style.display = 'none';
        userAuthElem.style.display = 'block';
        userAuthElem.children[0].innerText = "Привіт " + store.user?.name
    }
}

export default checkAuthorization;