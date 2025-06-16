let infos = document.querySelector('.infos');

let nompays = document.createElement('p');
let capitalpays = document.createElement('p');
let drapeaupays = document.createElement('div'); 
let monnaiepays = document.createElement('p');
let languespays = document.createElement('p');
let habitantspays = document.createElement('p');

function search() {
  let textesaisir = document.querySelector('.input').value.toUpperCase();
  if (!textesaisir) {
    showError("Veuillez entrer le nom d'un pays");
    return;
  }

  // Ajouter une classe pour l'animation de chargement
  infos.innerHTML = '<div class="text-center"><div class="spinner-border text-light" role="status"></div></div>';

  let url = `https://restcountries.com/v3.1/name/${textesaisir}`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Pays non trouvé');
      }
      return response.json();
    })
    .then(data => {
      let continent = data[0];
      
      // Formatter les nombres avec des séparateurs de milliers
      const formatNumber = (num) => new Intl.NumberFormat().format(num);
      
      nompays.innerHTML = `<i class="fas fa-flag"></i> Pays:<br><br>${textesaisir}`;
      capitalpays.innerHTML = `<i class="fas fa-city"></i> Capital:<br><br>${continent.capital[0]}`;
      drapeaupays.innerHTML = `<i class="fas fa-flag"></i> Drapeau: <br><br><img class="img-fluid rounded shadow" style="max-width:120px; height:auto;" src="${continent.flags.png}"/>`;
      monnaiepays.innerHTML = `<i class="fas fa-coins"></i> Monnaie:<br><br>${Object.values(continent.currencies)[0].name}`;
      languespays.innerHTML = `<i class="fas fa-language"></i> Langues:<br><br>${Object.values(continent.languages)[0]}`;
      habitantspays.innerHTML = `<i class="fas fa-users"></i> Population:<br><br>${formatNumber(continent.population)} environ`;
      
      // Vider les résultats précédents
      infos.innerHTML = '';
      
      // Ajouter les éléments avec un délai pour l'animation
      const elements = [nompays, capitalpays, languespays, monnaiepays, habitantspays, drapeaupays];
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.style.opacity = '0';
          infos.appendChild(element);
          // Déclencher l'animation
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
          }, 50);
        }, index * 200);
      });
      
      document.querySelector('.input').value = "";
    })
    .catch(error => {
      showError("Pays non trouvé. Veuillez vérifier l'orthographe.");
    });
}

function showError(message) {
  infos.innerHTML = `
    <div class="alert alert-danger" role="alert">
      <i class="fas fa-exclamation-circle"></i> ${message}
    </div>
  `;
}

// Ajouter la recherche avec la touche Entrée
document.querySelector('.input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    search();
  }
});
