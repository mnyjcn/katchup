// Steps: 0 = weight, 1 = height, 2 = goal
let currentStep = 0;
let weightKg = 70;
let heightCm = 170;
let goal = "lose";

// DOM
const questionText = document.getElementById("questionText");
const unitToggle = document.getElementById("unitToggle");
const unitButtons = document.querySelectorAll(".unit-btn");
const valueDisplay = document.getElementById("valueDisplay");
const valueUnit = document.getElementById("valueUnit");
const leftLabel = document.getElementById("leftLabel");
const centerLabel = document.getElementById("centerLabel");
const rightLabel = document.getElementById("rightLabel");
const slider = document.getElementById("valueSlider");
const progressDots = document.querySelectorAll(".progress .dot");
const goalSection = document.getElementById("goalSection");
const goalButtons = document.querySelectorAll(".goal-btn");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

// Helpers
function updateProgress() {
  progressDots.forEach((dot, index) => {
    dot.classList.toggle("active", index <= currentStep);
  });
}

function showStep() {
  updateProgress();

  if (currentStep === 0) {
    questionText.textContent = "What is your weight?";
    unitToggle.style.display = "flex";
    goalSection.style.display = "none";

    valueUnit.textContent = "kg";
    slider.min = 40;
    slider.max = 150;
    slider.value = weightKg;
    valueDisplay.textContent = weightKg;
    leftLabel.textContent = "50";
    centerLabel.textContent = weightKg;
    rightLabel.textContent = "90";
    nextBtn.textContent = "Next ››";
  } else if (currentStep === 1) {
    questionText.textContent = "What is your height?";
    unitToggle.style.display = "none"; // keep it simple: always cm
    goalSection.style.display = "none";

    valueUnit.textContent = "cm";
    slider.min = 140;
    slider.max = 200;
    slider.value = heightCm;
    valueDisplay.textContent = heightCm;
    leftLabel.textContent = "150";
    centerLabel.textContent = heightCm;
    rightLabel.textContent = "190";
    nextBtn.textContent = "Next ››";
  } else {
    // Goal step
    questionText.textContent = "What do you want to achieve?";
    unitToggle.style.display = "none";
    goalSection.style.display = "flex";
    document.querySelector(".value-card").style.display = "none";
    nextBtn.textContent = "Finish";
  }
}

slider.addEventListener("input", () => {
  const val = Number(slider.value);
  valueDisplay.textContent = val;
  centerLabel.textContent = val;

  if (currentStep === 0) {
    weightKg = val;
  } else if (currentStep === 1) {
    heightCm = val;
  }
});

// Unit toggle (for weight display only)
unitButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    unitButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const unit = btn.dataset.unit;
    if (unit === "kg") {
      valueUnit.textContent = "kg";
      // keep weightKg as base
      slider.min = 40;
      slider.max = 150;
      slider.value = weightKg;
      valueDisplay.textContent = weightKg;
      centerLabel.textContent = weightKg;
    } else {
      valueUnit.textContent = "lb";
      const lb = Math.round(weightKg * 2.205);
      slider.min = 90;
      slider.max = 330;
      slider.value = lb;
      valueDisplay.textContent = lb;
      centerLabel.textContent = lb;
    }
  });
});

// Goal select
goalButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    goalButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    goal = btn.dataset.goal; // lose / healthy / muscle
  });
});

backBtn.addEventListener("click", () => {
  if (currentStep === 0) {
    // maybe go back to register or just do nothing
    window.history.back();
  } else {
    currentStep--;
    // If we came back from goal, show card again
    if (currentStep < 2) {
      document.querySelector(".value-card").style.display = "block";
    }
    showStep();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentStep < 2) {
    currentStep++;
    showStep();
  } else {
    // Save profile and go home
    const profile = { weightKg, heightCm, goal }; // goal: lose / healthy / muscle
    localStorage.setItem("userProfile", JSON.stringify(profile));
    window.location.href = "home.html";
  }
});

// Init
showStep();
