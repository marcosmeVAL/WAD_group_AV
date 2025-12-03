document.addEventListener('DOMContentLoaded', () => {
  const profilePic = document.getElementById('profile-pic');
  const dropdownMenu = document.getElementById('dropdown-menu');

  // Start as hidden
  dropdownMenu.classList.add('hidden');

  // Toggle dropdown visibility
  profilePic.addEventListener('click', (e) => {
    dropdownMenu.classList.toggle('hidden');
  });

  // Logout button
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
});
