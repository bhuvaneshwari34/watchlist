// Initialize the watchlist as an empty array
let watchlist = [];

// DOM elements
const stockItems = document.querySelectorAll('.stock-item');
const watchlistContainer = document.getElementById('watchlist');

// Function to add stock to the watchlist
function addToWatchlist(stockSymbol) {
  // Check if the stock is already in the watchlist
  if (!watchlist.includes(stockSymbol)) {
    watchlist.push(stockSymbol);
    renderWatchlist();
  }
}

// Function to remove stock from the watchlist
function removeFromWatchlist(stockSymbol) {
  watchlist = watchlist.filter(symbol => symbol !== stockSymbol);
  renderWatchlist();
}

// Function to render the watchlist
function renderWatchlist() {
  // Clear the current watchlist
  watchlistContainer.innerHTML = '';

  // Render each stock in the watchlist
  watchlist.forEach(stockSymbol => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${stockSymbol}</span>
      <button class="remove-btn" onclick="removeFromWatchlist('${stockSymbol}')">Remove</button>
    `;
    watchlistContainer.appendChild(listItem);
  });
}

// Attach click event to each "Add to Watchlist" button
stockItems.forEach(item => {
  const button = item.querySelector('.add-btn');
  const stockSymbol = item.dataset.symbol;

  button.addEventListener('click', () => {
    addToWatchlist(stockSymbol);
  });
});

// Simulate random price changes for the stocks
setInterval(() => {
  stockItems.forEach(item => {
    const priceElement = item.querySelector('span');
    const currentPrice = parseFloat(priceElement.textContent.split(': $')[1]);
    const randomChange = (Math.random() - 0.5) * 10; // Random price change between -5 and +5
    const newPrice = (currentPrice + randomChange).toFixed(2);
    priceElement.textContent = `${item.dataset.symbol}: $${newPrice}`;
  });
}, 2000); // Update prices every 2 seconds
