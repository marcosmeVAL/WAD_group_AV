function validateLogin() {
    var email = document.getElementById('email').value.trim();
    var username = document.getElementById('username').value.trim();

    if (email === '' || username === '') {
        alert('Please fill in both Email and Username fields.');
        return false;
    }

    window.location.href = 'index.html';
    return false;
}