document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate user authentication (replace with actual authentication logic)
    const user = authenticateUser(username, password);

    if (user) {
        if (user.role === 'student') {
            // Redirect to student dashboard or quiz.html
            window.location.href = 'quiz.html';
        } else if (user.role === 'admin') {
            // Redirect to admin dashboard
            window.location.href = 'admin-dashboard.html';
        }
        document.getElementById('login-message').innerText = `Welcome, ${user.username}!`;
    } else {
        document.getElementById('login-message').innerText = 'Invalid credentials. Please try again.';
    }
});

function authenticateUser(username, password) {
    // Simulate user authentication logic
    const user = users.find(u => u.username === username && u.password === password);
    return user;
}
