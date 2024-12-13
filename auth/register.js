// import {user} from '../js/store'

import { urlMainServer } from "../js/store";

// Обробка форми реєстрації
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById('registerPassword').value;
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;

    try {
        const response = await fetch(`${urlMainServer}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name })
        });

        const data = await response.json();
        if (response.ok) {
            console.log(data)

            const user = {
                email,
                password,
                name,
                role: "user"
            }
            sessionStorage.setItem("user", JSON.stringify(user))
            window.location.href = 'https://serednii.github.io/Converter_client/';

        } else {
            alert(`Помилка: ${data.message}`);
        }
    } catch (error) {
        alert('Не вдалося підключитися до сервера');
    }
});

