fetch('data.json')
  .then(r => r.json())
  .then(data => {
    const container = document.getElementById('taches-container');
    const personnes = data.personnes.sort(); // Alpha
    const categories = {};
    
    data.taches.forEach(tache => {
      if (!categories[tache.categorie]) categories[tache.categorie] = [];
      categories[tache.categorie].push(tache);
    });
    
    Object.keys(categories).forEach(cat => {
      // Séparateur coloré
      container.innerHTML += `<div class="separateur" data-cat="${cat.toLowerCase().replace(/ /g,'')}"></div>`;
      
      categories[cat].forEach(tache => {
        const select = `<select multiple name="${tache.nom.replace(/ /g,'_')}">
          ${personnes.map(p => `<option value="${p}">${p}</option>`).join('')}
        </select>`;
        container.innerHTML += `
          <div class="tache categorie-${cat.toLowerCase().replace(/ /g,'')}">
            <div class="nom">${tache.nom}</div>
            ${select}
            <small><strong>Ctrl/Cmd + clic</strong> pour plusieurs personnes</small>
          </div>`;
      });
    });
  });
