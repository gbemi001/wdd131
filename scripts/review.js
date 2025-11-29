// Get current count from localStorage (or use 0 if none saved yet)
let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;

// Increase count because this page loads after a successful review submission
reviewCount++;

// Save new value back to localStorage
localStorage.setItem("reviewCount", reviewCount);

// Display the count in the HTML
document.querySelector("#reviewCount").textContent = reviewCount;