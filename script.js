async function loadData() {
  const res = await fetch('data.json');
  const json = await res.json();

  const content = document.getElementById("content");

  // Les listes de Trello sont dans json.lists
  // et les cartes dans json.cards
  const lists = json.lists.filter(l => !l.closed);
  const cards = json.cards.filter(c => !c.closed);

  let html = '<div class="kanban">';

  for (const list of lists) {
    html += `<div class="column"><h2>${list.name}</h2>`;

    const cardsInList = cards.filter(c => c.idList === list.id);

    if (cardsInList.length === 0) {
      html += "<p><em>Aucune tâche</em></p>";
    }

    for (const card of cardsInList) {
      html += `<div class="card">${card.name}</div>`;
    }

    html += "</div>";
  }

  html += "</div>";

  content.innerHTML = html;
}

loadData();
