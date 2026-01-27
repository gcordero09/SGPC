document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Clear previous errors
            if (errorMessage) {
                errorMessage.textContent = '';
                errorMessage.style.display = 'none';
            }

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const submitBtn = loginForm.querySelector('button[type="submit"]');

            // Disable button
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Verificando...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/api/usuarios/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });

                if (response.ok) {
                    const user = await response.json();
                    localStorage.setItem('sgpc_user', JSON.stringify(user));
                    // Login successful
                    window.location.href = 'html/dashboard.html';
                } else {
                    // User not found or invalid credentials
                    if (errorMessage) {
                        errorMessage.textContent = 'Correo o contraseña incorrectos. Verifique sus credenciales.';
                        errorMessage.style.display = 'block';
                    } else {
                        alert('Correo o contraseña incorrectos');
                    }
                }
            } catch (error) {
                console.error('Error during login:', error);
                if (errorMessage) {
                    errorMessage.textContent = 'Error de conexión. Intente más tarde.';
                    errorMessage.style.display = 'block';
                }
            } finally {
                // Re-enable button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
