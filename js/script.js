document.addEventListener("DOMContentLoaded", function() {
  const dateElement = document.getElementById("date");
  const today = new Date();

  // Options pour l'affichage de la date
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };

  // Affichage de la date
  dateElement.textContent = "📅 " + today.toLocaleDateString('fr-FR', options);


  // 1. Affichage de l'heure en temps réel
  const timeElement = document.getElementById("time");
  function updateTime() {
    const now = new Date();
    timeElement.textContent = "⏰ " + now.toLocaleTimeString('fr-FR');
  }
  updateTime();
  setInterval(updateTime, 1000); // mise à jour chaque seconde

  // 3. Message de bienvenue dynamique selon l'heure
  const welcomeElement = document.getElementById("welcome");
  if (welcomeElement) {
    const hour = today.getHours();
    let message = "Bienvenue à l'IFOAD-UJKZ !";
    if (hour < 12) {
      message = "Bonjour et bienvenue à l'IFOAD-UJKZ 🌞";
    } else if (hour < 18) {
      message = "Bon après-midi et bienvenue à l'IFOAD-UJKZ 🌤️";
    } else {
      message = "Bonsoir et bienvenue à l'IFOAD-UJKZ 🌙";
    }
    welcomeElement.textContent = message;
  }
});