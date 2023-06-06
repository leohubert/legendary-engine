// Sélection des éléments du formulaire
const form = document.querySelector('form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const errorMessage = document.querySelector('#error-message');
const bouton = document.querySelector('#submit')

// Pour la soumission du formulaire
bouton.addEventListener('click', async (event) => {
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
      // Stocker le token dans le stockage de session
      sessionStorage.setItem('token', token);
      // Redirection vers la page d'accueil
      window.location.href = 'index.html';
    } 
    else {
      let errorMsg = document.getElementById('error-message');
      errorMsg.textContent = '! Erreur lors de la connexion !';
    }
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
  }
});

// Fonction de déconnexion
function logout() {
  // Supprimer le token du stockage de session
  sessionStorage.removeItem('token');
  // Redirection vers la page de connexion
  window.location.href = 'login.html';
}

// Gestionnaire d'événement pour le bouton de déconnexion
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', logout);

// Après l'authentification réussie, afficher le contenu d'édition
const modalElement = document.getElementById('modal1');
modalElement.classList.add('show');
