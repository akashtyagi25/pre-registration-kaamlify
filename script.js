// Countdown Timer
function updateCountdown() {
  const launchDate = new Date('2026-01-10T00:00:00');
  const now = new Date();
  let diff = launchDate - now;
  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-minutes').textContent = '00';
    document.getElementById('cd-seconds').textContent = '00';
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff %= (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff %= (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff %= (1000 * 60);
  const seconds = Math.floor(diff / 1000);
  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Register Dialog Logic
const openDialogBtn = document.getElementById('getStartedBtn');
const registerDialog = document.getElementById('registerDialog');
const closeDialogBtn = document.getElementById('closeDialogBtn');
const registerForm = document.getElementById('register-form');
const thankYouMsg = document.getElementById('thank-you-message');
const loadingMsg = document.getElementById('loading-message');

openDialogBtn.addEventListener('click', () => {
  registerDialog.style.display = 'flex';
});
closeDialogBtn.addEventListener('click', () => {
  registerDialog.style.display = 'none';
  registerForm.reset();
  thankYouMsg.style.display = 'none';
  loadingMsg.style.display = 'none';
  registerForm.style.display = 'block';
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loadingMsg.style.display = 'block';
  registerForm.style.display = 'none';
  thankYouMsg.style.display = 'none';
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  try {
    await fetch('https://sheetdb.io/api/v1/your-sheetdb-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [{ name, email }] })
    });
    loadingMsg.style.display = 'none';
    thankYouMsg.style.display = 'block';
    setTimeout(() => {
      thankYouMsg.style.display = 'none';
      registerDialog.style.display = 'none';
      registerForm.reset();
      registerForm.style.display = 'block';
    }, 8000);
  } catch (err) {
    loadingMsg.style.display = 'none';
    registerForm.style.display = 'block';
    alert('Registration failed. Please try again.');
  }
});
