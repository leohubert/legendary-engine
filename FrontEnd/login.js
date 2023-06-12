document.addEventListener('DOMContentLoaded', () => {
// Sélection des éléments du formulaire
const form = document.querySelector('form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const errorMessage = document.querySelector('#error-message');
const button = document.querySelector('#submit')

// Pour la soumission du formulaire
const loginOk = document.querySelector('#submit');
if (loginOk) {
loginOk.addEventListener('click', async (event) => {
  event.preventDefault(); // Empêche le rechargement de la page
  // Récupération des valeurs des champs email et mot de passe
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Envoi des données au serveur
  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      // Connexion réussie
      const data = await response.json();
      // Récupérer le token d'authentification
      const token = data.token;
      // Stocker le token- sessionStorage pour déconnexion lors de la fermeture onglet/fenêtre
      sessionStorage.setItem('token', token);
      // Redirection vers la page d'accueil
      window.location.href = 'index.html';
      // Après l'authentification réussie, afficher le contenu d'édition
      const modalElements = document.querySelectorAll('.modeEdition');
      modalElements.forEach((element) => {
        element.classList.add('show');
      });
    }
    else {
      let errorMsg = document.getElementById('error-message');
      errorMsg.textContent = '! Erreur lors de la connexion !';
    }
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
  }
  
});
}

});