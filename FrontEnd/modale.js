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
  
      // Cacher la galerie lorsque l'utilisateur est connecté
      const galleryElement = document.querySelector('.categories');
      galleryElement.style.display = 'none';
    } else {
      // Cacher éléments de logout 
      const isLoggedOutList = document.querySelectorAll('.logout');
      isLoggedOutList.forEach(outList => {
        outList.style.display = 'none';
      });
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
  getProjectModal();
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

  // Récupérer les projets
  function getProjectModal() {
    fetch("http://localhost:5678/api/works")
        .then(function (response) { 
            return response.json();
        }).then(function (projects) {
            const modalGalerie = document.querySelector(".modalGalerie");
            modalGalerie.innerHTML = '';
            projects.forEach(function (project) { 
                modifierProjetsModal(project); 
            });
        });
}
function modifierProjetsModal (project) {
    const modalGalerie = document.querySelector(".modalGalerie");
  
    const figure = document.createElement("figure");
    figure.classList.add("figureModal");
  
    const img = document.createElement("img");
    img.src = project.imageUrl;
    img.width = 100;
  
    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("figCaption");
    figcaption.alt = project.title;
    figcaption.textContent = "éditer";
  
    const categoryId = document.createElement("p");
    categoryId.src = project.categoryId;
  
    const deleteWork = document.createElement("i");
    deleteWork.classList.add("deleteTrashIcon", "fa", "fa-solid", "fa-trash-can");
    deleteWork.dataset.id = project.id;
  
    // Ajout de l'écouteur d'événement pour la suppression
    deleteWork.addEventListener('click', function() {
        
      fetch(`http://localhost:5678/api-docs/#/default/delete_works__id_`, {
        method: 'DELETE',
      })
      .then(function(response) {
        // Traitez la réponse de la suppression de l'élément
        if (response.ok) {
          figure.remove(); // Supprime l'élément de la galerie visuellement
        } 
        else {
          // La suppression a échoué
          console.error('Erreur lors de la suppression');
        }
      })
      .catch(function(error) {
        // Gérez les erreurs de la requête fetch
        console.error('Erreur lors de la suppression', error);
      });
  });

  
    figure.append(img, figcaption, categoryId, deleteWork);
    modalGalerie.append(figure);
  }
  
  // Ajout du gestionnaire d'événement pour fermer la fenêtre modale
  const closeModalButton = document.querySelector('.closeModal');
  closeModalButton.addEventListener('click', closeModal);
  const modal1 = document.getElementById('modal1');
  modal1.addEventListener('click', function (e) {
  if (e.target === modal1) {
    closeModal(e);
  }
});

// Fermeture de la modale au click su l'overlay
const overlay = document.querySelector('.overlay');
overlay.addEventListener('click', closeModal);

