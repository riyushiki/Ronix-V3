document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Login Error');
        }

        const result = await response.json();
        localStorage.setItem('token', result.token);
        alert('Successful login!');
        window.location.href = '/index.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Login Error');
    }
});
