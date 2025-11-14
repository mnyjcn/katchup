const titleEl = document.getElementById("bkTitle");
const timeEl = document.getElementById("bkTime");
const trainerEl = document.getElementById("bkTrainer");
const priceEl = document.getElementById("bkPrice");
const form = document.getElementById("bookingForm");

// Load selected class (set in calendar.js)
const stored = localStorage.getItem("selectedClass");
let currentClass = stored ? JSON.parse(stored) : null;

if (currentClass) {
  titleEl.textContent = currentClass.title;
  timeEl.textContent = currentClass.time;
  trainerEl.textContent = `Trainer: ${currentClass.trainer || "Patricia Talla"}`;
  priceEl.textContent = "₱500";
} else {
  titleEl.textContent = "Your Class";
  timeEl.textContent = "Choose a class from the calendar";
  trainerEl.textContent = "Trainer: Patricia Talla";
  priceEl.textContent = "₱500";
}

// Helper to read existing booked list
function getBookedClasses() {
  const raw = localStorage.getItem("bookedClasses");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error parsing bookedClasses in booking:", e);
    localStorage.removeItem("bookedClasses");
    return [];
  }
}

// Handle payment + save booking
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const method = document.getElementById("payMethod").value;
  if (!method) return;

  if (currentClass) {
    const bookings = getBookedClasses();

    bookings.push({
      title: currentClass.title,
      time: currentClass.time,
      trainer: currentClass.trainer || "Patricia Talla",
      dateKey: currentClass.dateKey,
      price: 500
    });

    localStorage.setItem("bookedClasses", JSON.stringify(bookings));
    console.log("Saved bookings:", bookings); // DEBUG
  }

  if (method === "gcash") {
    alert("GCash payment of ₱500 successful! 🎉");
  } else if (method === "maya") {
    alert("Maya payment of ₱500 successful! 🎉");
  } else {
    alert("Payment of ₱500 successful! 🎉");
  }

  window.location.href = "calendar.html";
});
