// Onglets
function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

// Mode sombre
const toggleDark = document.getElementById('toggleDark');
toggleDark.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
}

// Sauvegarde et affichage des œuvres
const form = document.getElementById('artForm');
const gallery = document.getElementById('galleryContent');

window.addEventListener('load', () => {
  const savedArtworks = JSON.parse(localStorage.getItem('artworks')) || [];
  savedArtworks.forEach(addArtworkToGallery);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const imageFile = document.getElementById('imageUpload').files[0];

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function () {
      const artwork = { title, description, image: reader.result };
      saveArtwork(artwork);
      addArtworkToGallery(artwork);
    };
    reader.readAsDataURL(imageFile);
  } else {
    const artwork = { title, description, image: null };
    saveArtwork(artwork);
    addArtworkToGallery(artwork);
  }

  form.reset();
});

function saveArtwork(artwork) {
  const artworks = JSON.parse(localStorage.getItem('artworks')) || [];
  artworks.unshift(artwork);
  localStorage.setItem('artworks', JSON.stringify(artworks));
}

function addArtworkToGallery({ title, description, image }) {
  const artwork = document.createElement('div');
  artwork.className = 'artwork';
  artwork.innerHTML = `
    <h3>${title}</h3>
    ${image ? `<img src="${image}" class="art-image" />` : ''}
    <p>${description}</p>
    <div class="reactions">
      <button onclick="react(this)">🤯 Génie incompris</button>
      <button onclick="react(this)">🧻 Besoin de papier</button>
      <button onclick="react(this)">💩 Chef-d'œuvre scatologique</button>
    </div>
  `;
  gallery.prepend(artwork);
}

function react(button) {
  button.textContent += ' ✅';
  button.disabled = true;
}
