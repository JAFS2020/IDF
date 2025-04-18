export function initializeLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    const sanitizeInput = (value) => {
        return value.replace(/[<>&'"/]/g, '');
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPassword = (password) => {
        return password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /\d/.test(password) &&
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?+]/.test(password);
    };

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger mt-3';
        errorDiv.innerHTML = message.replace(/\n/g, '<br>');

        const existingError = form.querySelector('.alert');
        if (existingError) existingError.remove();

        form.appendChild(errorDiv);
    }

    form.onsubmit = function (e) {
        e.preventDefault();

        const emailInput = document.querySelector('input[name="Email"]');
        const passwordInput = document.querySelector('input[name="Password"]');
        const tokenInput = form.querySelector('input[name="__RequestVerificationToken"]');

        const email = sanitizeInput(emailInput.value);
        const password = sanitizeInput(passwordInput.value);
        const token = tokenInput ? tokenInput.value : '';

        const loginText = document.getElementById('loginText');
        const loading = document.getElementById('loading');
        const submitButton = document.getElementById('btnLogin');

        const existingError = form.querySelector('.alert');
        if (existingError) existingError.remove();

        if (!isValidEmail(email)) {
            showError('Formato de email inválido');
            return;
        }

        if (!isValidPassword(password)) {
            showError('La contraseña debe cumplir los requisitos');
            return;
        }

        submitButton.disabled = true;
        emailInput.readOnly = true;
        passwordInput.readOnly = true;
        loginText.style.display = 'none';
        loading.style.display = 'block';

        fetch('/Auth/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                __RequestVerificationToken: token,
                Email: email,
                Password: password
            })
        })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    return response.text().then(html => {
                        document.body.innerHTML = html;
                    });
                }
            })
            .catch(error => {
                console.error('Error en la autenticación:', error);
                showError('Hubo un error al procesar tu solicitud. Intenta nuevamente.');
            })
            .finally(() => {
                submitButton.disabled = false;
                emailInput.readOnly = false;
                passwordInput.readOnly = false;
                loginText.style.display = 'block';
                loading.style.display = 'none';
            });
    };
}
