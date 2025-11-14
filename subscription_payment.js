// Get plan info from URL (sent from subscription.js)
const params = new URLSearchParams(window.location.search);
const plan = params.get("plan") || "Start";
const price = params.get("price") || "99";

document.getElementById("planValue").textContent =
  `${plan} — ₱${price}/month`;

function completePayment() {
  const method = document.getElementById("paymentSelect").value;
  const msg = document.getElementById("paymentMsg");

  if (!method) {
    msg.textContent = "Please choose a payment method.";
    return;
  }

  msg.textContent = `Payment of ₱${price} via ${method} successful! (Demo only)`;
}
