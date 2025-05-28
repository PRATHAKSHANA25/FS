// main.js

// Display welcome message in console
console.log("🎉 Welcome to the Community Portal 🎉");

// Alert when page is fully loaded
window.addEventListener("load", () => {
  alert("Page loaded! Ready to explore events.");
});

// Event Constructor
class Event {
  constructor(name, date, category, seats, location) {
    this.name = name;
    this.date = new Date(date);
    this.category = category;
    this.seats = seats;
    this.location = location;
  }

  checkAvailability() {
    return this.seats > 0;
  }
}

// Sample Events
let events = [
  new Event("Music Night", "2025-06-15", "Music", 30, "Town Hall"),
  new Event("Art Workshop", "2025-05-20", "Art", 0, "Library"),
  new Event("Yoga Class", "2025-07-10", "Health", 20, "Community Center"),
];

// Create Event Cards
function displayEvents(eventList) {
  const container = document.querySelector("#eventContainer");
  container.innerHTML = "";

  eventList.forEach((evt, index) => {
    if (evt.date >= new Date() && evt.checkAvailability()) {
      const card = document.createElement("div");
      card.className = "event-card";
      card.innerHTML = `
        <h3>${evt.name}</h3>
        <p><strong>Date:</strong> ${evt.date.toDateString()}</p>
        <p><strong>Category:</strong> ${evt.category}</p>
        <p><strong>Location:</strong> ${evt.location}</p>
        <p><strong>Seats Left:</strong> ${evt.seats}</p>
        <button onclick="register(${index})">Register</button>
      `;
      container.appendChild(card);
    }
  });
}

// Registration Logic
function register(index) {
  try {
    if (events[index].seats > 0) {
      events[index].seats--;
      alert(`🎫 Registered for ${events[index].name}!`);
      displayEvents(events);
    } else {
      throw new Error("No seats available.");
    }
  } catch (error) {
    alert("❌ " + error.message);
  }
}

// Filter Events
function filterByCategory(cat) {
  const filtered = events.filter(evt => evt.category === cat);
  displayEvents(filtered);
}

// Sample usage of closures
function registrationTracker() {
  let count = 0;
  return function () {
    count++;
    console.log(`Total registrations: ${count}`);
  };
}
const trackRegistration = registrationTracker();

// Initial Display
document.addEventListener("DOMContentLoaded", () => {
  displayEvents(events);

  // Filter logic
  document.querySelector("#categoryFilter").addEventListener("change", (e) => {
    if (e.target.value === "All") {
      displayEvents(events);
    } else {
      filterByCategory(e.target.value);
    }
  });
});