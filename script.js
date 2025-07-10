const form = document.getElementById('tracker-form');
const entryList = document.getElementById('entry-list');
const totalDisplay = document.getElementById('total');
const clearButton = document.getElementById('clear-entries');
const itemInput = document.getElementById('item');
const amountInput = document.getElementById('amount');
const caloriesInput = document.getElementById('calories');

let entries = JSON.parse(localStorage.getItem('entries')) || [];

function saveEntries() {
  localStorage.setItem('entries', JSON.stringify(entries));
}

function formatDate(ts) {
  return new Date(ts).toLocaleString();
}

function updateTotal() {
  const total = entries.reduce((sum, e) => sum + e.calories, 0);
  totalDisplay.textContent = `Gesamt: ${total} kcal`;
}

function renderEntries() {
  entryList.innerHTML = '';
  entries.forEach(e => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${e.item}</td>
      <td>${e.amount} g</td>
      <td>${e.calories} kcal</td>
      <td>${formatDate(e.timestamp)}</td>
      <td><button class="delete-btn" data-id="${e.id}">&times;</button></td>`;
    entryList.appendChild(row);
  });
  updateTotal();
}

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const item = itemInput.value.trim();
  const amount = parseInt(amountInput.value, 10);
  const calories = parseInt(caloriesInput.value, 10);

  if (item && amount && calories) {
    entries.push({
      id: Date.now(),
      item,
      amount,
      calories,
      timestamp: new Date().toISOString()
    });
    saveEntries();
    renderEntries();
    form.reset();
  }
});

entryList.addEventListener('click', evt => {
  if (evt.target.classList.contains('delete-btn')) {
    const id = parseInt(evt.target.dataset.id, 10);
    entries = entries.filter(e => e.id !== id);
    saveEntries();
    renderEntries();
  }
});

clearButton.addEventListener('click', () => {
  entries = [];
  saveEntries();
  renderEntries();
});

renderEntries();
