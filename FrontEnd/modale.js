// Création modale et fonctions édition 

// Code pour ouvrir la modale
function ouvrirModale() {
    var modale = document.getElementById('modale');
    modale.classList.add('open'); // Ajouter la classe "open" pour afficher la modale
  }
  
  // Code pour fermer la modale
  function fermerModale() {
    var modale = document.getElementById('modale');
    modale.classList.remove('open'); // Retirer la classe "open" pour masquer la modale
  }
  
