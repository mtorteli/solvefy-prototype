document.addEventListener('DOMContentLoaded', () => {
  // Configurando a data alvo: 15 de Maio de 2026 à meia-noite
  const targetDate = new Date('2026-05-15T00:00:00').getTime();
  const countdownElement = document.getElementById('countdown');

  if (!countdownElement) return;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      countdownElement.innerHTML = "00d 00h 00m 00s";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Formatação para sempre exibir 2 dígitos
    const formattedDays = String(days).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    countdownElement.innerHTML = `${formattedDays}d ${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
  }

  // Atualiza imediatamente e depois a cada segundo
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
