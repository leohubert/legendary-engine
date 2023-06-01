// Sélection des éléments du formulaire
const form = document.querySelector('form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const errorMessage = document.querySelector('#error-message');
const bouton = document.querySelector('#submit')

// Écouteur d'événement pour la soumission du formulaire
bouton.addEventListener('click', async (event) => {
  event.preventDefault(); // Empêche le rechargement de la page
  // Récupération des valeurs des champs email et mot de passe
  const email = emailInput.value;
  const password = passwordInput.value;

  // Envoi des données au serveur
  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        
      },
      body: JSON.stringify({
        "email": "sophie.bluel@test.tld",
        "password": "s0phie"
      }),

    });
    if (response.ok) {
      // Connexion réussie
      const data = await response.json();
      // Traitez ici la réponse du serveur selon vos besoins
      console.log(data);
    } else {
      // Erreur de connexion
      const errorData = await response.json();
      errorMessage.textContent = errorData.message;
    }
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
  }
});
