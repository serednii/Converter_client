// import {user} from '../js/store'
// Обробка форми реєстрації


// Обробка форми входу
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {

        const response = await fetch('http://localhost:8000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const user = await response.json();
        if (response.ok) {
            console.log(user)
            sessionStorage.setItem("user", JSON.stringify({ ...user, email }))
            window.location.href = 'https://serednii.github.io/';
        } else {
            alert(`Помилка: ${data.message}`);
        }
    } catch (error) {
        alert('Не вдалося підключитися до сервера');
    }
});
