document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email) {
                console.log("Email field is blank.");
            } else if (!password) {
                console.log("Password field is blank.");
            } else {
                try {
                    const response = await fetch('/api/users/login', { 
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                    });

                    const result = await response.json();
                    if (response.ok) {
                        console.log('Login successful:', result.message);
                    } else {
                        console.log('Login failed:', result.message);
                    }
                } catch (error) {
                    console.error('Error during fetch:', error);
                }
            }
        });
    } else {
        console.error('Login form not found');
    }
});
