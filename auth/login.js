// import {user} from '../js/store'
// Обробка форми реєстрації


// Обробка форми входу
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const login = document.getElementById('loginLogin').value;
    const password = document.getElementById('loginPassword').value;

    try {

        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
        });

        const user = await response.json();
        if (response.ok) {
            console.log(user)
            // sessionStorage.setItem("user", JSON.stringify(user))
            // window.location.href = '/';
        } else {
            alert(`Помилка: ${data.message}`);
        }
    } catch (error) {
        alert('Не вдалося підключитися до сервера');
    }
});
