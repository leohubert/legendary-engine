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
        }
        // Masquer les éléments liés à la déconnexion
        else {
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

// Déclaration de la variable modale
let modal = null;

// Fonction pour ouvrir la fenêtre modale
const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('data-target'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal);
};

// Fonction pour fermer la fenêtre modale
const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal = null;
};

// Ajout des gestionnaires d'événement pour ouvrir la fenêtre modale
document.querySelectorAll('.modalContent').forEach(a => {
    a.addEventListener('click', openModal);
});
