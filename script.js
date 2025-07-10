document.getElementById('tracker-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const item = document.getElementById('item').value;
  const calories = document.getElementById('calories').value;

  if (item && calories) {
    const listItem = document.createElement('li');
    listItem.textContent = `${item}: ${calories} kcal`;

    document.getElementById('entry-list').appendChild(listItem);

    // Felder zurücksetzen
    document.getElementById('item').value = '';
    document.getElementById('calories').value = '';
  }
});
