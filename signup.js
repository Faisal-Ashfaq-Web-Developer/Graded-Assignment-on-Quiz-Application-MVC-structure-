document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate user creation (replace with actual user creation logic)
    const user = createUser(username, password);

    if (user) {
        if (user.role === 'student') {
            // Redirect to student dashboard or quiz.html after signup
            window.location.href = 'quiz.html';
        } else if (user.role === 'admin') {
            // Redirect to admin dashboard after signup
            window.location.href = 'admin-dashboard.html';
        }
        document.getElementById('signup-message').innerText = `Account created successfully for ${user.username}!`;
    } else {
        document.getElementById('signup-message').innerText = 'Error creating user. Please try again.';
    }
});

function createUser(username, password) {
    // Simulate user creation logic
    const newUser = new User(users.length + 1, username, password, 'student'); // Assume role is 'student'
    users.push(newUser);
    return newUser;
}
