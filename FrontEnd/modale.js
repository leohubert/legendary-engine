  // Événement DOMContentLoaded pour exécuter le code lorsque le contenu est chargé
  document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si le token est présent dans le stockage de session
    const token = sessionStorage.getItem('token');
    if (token) {
      // Masquer l'élément login lorsque l'utilisateur est connecté
      const loginElement = document.querySelector('.login');
      loginElement.style.display = 'none';
  
      // Afficher les éléments liés à la connexion réussie
      const isLoggedInList = document.querySelectorAll('.modeEdition');
      isLoggedInList.forEach(inList => {
        inList.style.display = 'block';
      });
  
      // Cacher la div gallery lorsque l'utilisateur est connecté
      const galleryElement = document.querySelector('.categories');
      galleryElement.style.display = 'none';
    } else {
      // Masquer les éléments liés à la déconnexion
      const isLoggedOutList = document.querySelectorAll('.logout');
      isLoggedOutList.forEach(outList => {
        outList.style.display = 'none';
      });
    }
  
    // Fonction pour afficher la fenêtre modale lorsqu'un utilisateur est connecté
    function showLoggedInModal() {
      const modal = document.querySelector('aside[data-target="modal1"]');
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  });
  
  // Fonction pour ouvrir la fenêtre modale
const openModal = function (e) {
    e.preventDefault();
    const target = document.getElementById('modal1');
    target.style.display = 'flex';
    target.setAttribute('aria-hidden', 'false');
      // Appel de la fonction pour ajouter les éléments à la fenêtre modale
  ajouterGalerie();
  };
  
  // Fonction pour fermer la fenêtre modale
  const closeModal = function (e) {
    e.preventDefault();
    const target = document.getElementById('modal1');
    target.style.display = 'none';
    target.setAttribute('aria-hidden', 'true');
  };
  
  const modifierProjetsElement = document.getElementById('modifierProjets');
  modifierProjetsElement.addEventListener('click', openModal);
  
  // Ajout du gestionnaire d'événement pour fermer la fenêtre modale
  const closeModalButton = document.querySelector('.closeModal');
  closeModalButton.addEventListener('click', closeModal);
  


  