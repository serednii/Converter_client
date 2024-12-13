// import {user} from '../js/store'
// Обробка форми реєстрації

// import { urlMainServer } from "../js/store";
const urlMainServer = 'https://converterserver-production.up.railway.app'

// Обробка форми входу
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    console.log(email, password)
    try {

        const response = await fetch(`${urlMainServer}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const user = await response.json();

        if (response.ok) {
            console.log(user);
            sessionStorage.setItem("user", JSON.stringify({ ...user, email }));
            window.location.href = 'https://serednii.github.io/Converter_client';
            console.log(window.location.href)
        } else {
            alert(`Помилка: ${data.message}`);
        }

    } catch (error) {
        alert('Не вдалося підключитися до сервера');
    }
});
