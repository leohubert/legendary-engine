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
      body: JSON.stringify({email, password})
    })  
    if (response.ok) {
      // Connexion réussie
      const data = await response.json();
      // Traitement de la réponse du serveur 
      console.log(data);
      // Redirection vers la page d'accueil
      window.location.href = 'index.html';
    }else{
        let errorMsg = document.getElementById('error-message');
        errorMsg.textContent="Erreur lors de la connexion";
      }
  
    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
  }
});
