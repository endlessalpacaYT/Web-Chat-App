document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');

    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            console.log("Current Username:", username);
            localStorage.setItem("username", username);
            
            if (!username) {
                console.log("Username field is blank.");
            } else if (!email) {
                console.log("Email field is blank.");
            } else if (!password) {
                console.log("Password field is blank.");
            } else {
                try {
                    const response = await fetch('/api/users/signup', { 
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username, email, password })
                    });

                    const result = await response.json();
                    if (response.ok) {
                        console.log('Signup successful:', result.message);
                    } else {
                        console.log('Signup failed:', result.message);
                    }
                } catch (error) {
                    console.error('Error during fetch:', error);
                }
            }
        });
    } else {
        console.error('Signup form not found');
    }
});
