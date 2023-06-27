// Événement DOMContentLoaded pour exécuter le code lorsque le contenu est chargé
document.addEventListener('DOMContentLoaded', () => {
  // Vérifier si le token est présent dans le stockage de session
  if (sessionStorage.getItem("token") && sessionStorage.getItem("token") !== "undefined") {
      console.log("Token:", sessionStorage.getItem("token"));
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

// Fonction pour ouvrir la fenêtre modale d'ajout de photo
const openAddModal = function (e) {
  e.preventDefault();
  const addModal = document.getElementById('modal3');
  addModal.style.display = 'flex';
  addModal.setAttribute('aria-hidden', 'false');

  // Bouton "retour"
  const retourButton = document.getElementById('retour');
  retourButton.addEventListener('click', function (e) {
    e.preventDefault();
    const modal1 = document.getElementById('modal1');
    const modal3 = document.getElementById('modal3');
    modal1.style.display = 'flex';
    modal3.style.display = 'none';
  });
};

function modifierProjetsModal(project) {
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

  // Evénement pour la suppression
  deleteWork.addEventListener('click', function () {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("Token non trouvé.");
      return;
    }

    const id = deleteWork.dataset.id;
    const url = `http://localhost:5678/api/works/${id}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        if (response.ok) {

          figure.remove(); // Supprime l'élément de la galerie visuellement
        } else {
          console.error('Erreur lors de la suppression');
        }
      })
      .catch(function (error) {
        console.error('Erreur lors de la suppression', error);
      });
  });

  figure.append(img, figcaption, categoryId, deleteWork);
  modalGalerie.append(figure);
}


// Ajoute un projet 
function addProjectToModal() {
  
  const image = document.getElementById("ajoutPhotoBtn").files[0];
  const title = document.getElementById("titrePhoto").value;
  const selectCategorie = document.getElementById("categoriePhoto");
  const category = selectCategorie.value;

  const formData = new formData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", category);

  const token = sessionStorage.getItem("token");

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      },
      body: formData,
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Erreur lors de l'ajout du projet");
      }
    })
    .catch(function (error) {
      console.error("Erreur lors de l'ajout du projet", error);
    });

  figure.append(img, figcaption, categoryId, formData);
  modalGalerie.append(figure);
}


// Fonction pour fermer les fenêtres avec le bouton
function closeModal() {
  const modal1 = document.getElementById('modal1');
  const modal3 = document.getElementById('modal3');

  modal1.style.display = 'none';
  modal3.style.display = 'none';
}

// Ajout du gestionnaire d'événement pour fermer la fenêtre modale
const closeModalButtons = document.querySelectorAll('.closeModal');
closeModalButtons.forEach(button => {
  button.addEventListener('click', closeModal);
});

// Fermeture de la modale au clic sur l'overlay pour la modale 1
const overlay = document.querySelector('.overlay');
overlay.addEventListener('click', closeModal);

// Événement pour ouvrir la fenêtre modale au clic sur le bouton "Modifier Projets"
const modifierProjetsElement = document.getElementById('modifierProjets');
modifierProjetsElement.addEventListener('click', openModal);

// Événement pour ouvrir la fenêtre modale d'ajout de photo au clic sur le bouton "Ajouter une photo"
const addPhotoButton = document.getElementById('ajoutImage');
addPhotoButton.addEventListener('click', openAddModal);

// Événement pour enregistrer l'ajout de la photo au clic sur le bouton "Valider"
const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', function () {
  addProjectToModal(); // Appel de la fonction ici après l'ouverture de la fenêtre modale
});
