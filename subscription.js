const planCards = document.querySelectorAll(".plan-card");
const startBarBtn = document.getElementById("startBarBtn");

let selectedPlan = null;

// clicking a card selects plan & price
planCards.forEach(card => {
  card.addEventListener("click", () => {
    planCards.forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");

    selectedPlan = {
      name: card.getAttribute("data-plan"),
      price: Number(card.getAttribute("data-price"))
    };
  });
});

startBarBtn.addEventListener("click", () => {
  if (!selectedPlan) {
    alert("Please choose a plan first (Start or Pro).");
    return;
  }

  const params = new URLSearchParams({
    plan: selectedPlan.name,
    price: selectedPlan.price
  });

  // go to HTML payment page (no PHP)
  window.location.href = "subscription_payment.html?" + params.toString();
});
