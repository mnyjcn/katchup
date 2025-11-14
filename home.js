// ===== GREETING =====
const storedName = localStorage.getItem("fitnessUserName");
const hiText = document.getElementById("hiText");
const nameText = document.getElementById("nameText");

// PROFILE PICTURE ON HOME
const profileImg = document.querySelector(".profile");
const storedProfileImg = localStorage.getItem("profileImageData");

if (profileImg && storedProfileImg) {
  profileImg.src = storedProfileImg;
}

if (storedName && nameText) {
  hiText.textContent = "Hi!";
  nameText.textContent = storedName + ",";
}

// ===== UPCOMING ACTIVITIES FROM BOOKINGS =====
function getBookedClasses() {
  const raw = localStorage.getItem("bookedClasses");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem("bookedClasses");
    return [];
  }
}

function renderUpcoming() {
  const container = document.getElementById("upcomingList");
  const title = document.querySelector(".upcoming-title");
  if (!container || !title) return;

  const bookings = getBookedClasses();

  if (!bookings.length) {
    title.style.display = "none";
    container.style.display = "none";
    return;
  }

  title.style.display = "block";
  container.style.display = "flex";

  container.innerHTML = "";
  bookings.forEach((b) => {
    const card = document.createElement("div");
    card.className = "schedule-card secondary";
    card.innerHTML = `
      <div class="details">
        <p class="class">${b.title}</p>
        <p class="time">${b.time}</p>
        <p class="time">Trainer: ${b.trainer || "Patricia Talla"}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// ===== MEAL PLAN (READ-ONLY ON HOME) =====
function getUserProfile() {
  const raw = localStorage.getItem("userProfile");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem("userProfile");
    return null;
  }
}

function generateBaseMealPlan(profile) {
  if (!profile) {
    return [
      { meal: "Breakfast", items: "Oatmeal with banana, black coffee", calories: 350 },
      { meal: "Lunch",     items: "Grilled chicken, brown rice, steamed vegetables", calories: 550 },
      { meal: "Dinner",    items: "Baked fish, side salad, olive oil dressing", calories: 500 },
      { meal: "Snacks",    items: "Greek yogurt, handful of nuts, apple", calories: 300 }
    ];
  }

  const { weightKg, goal } = profile;
  const w = Number(weightKg || 0);

  if (goal === "lose") {
    if (w >= 55 && w <= 65) {
      return [
        { meal: "Breakfast", items: "Overnight oats, berries, green tea", calories: 320 },
        { meal: "Lunch",     items: "Grilled chicken, quinoa, mixed veggies", calories: 480 },
        { meal: "Dinner",    items: "Tofu or fish stir-fry, cauliflower rice", calories: 420 },
        { meal: "Snacks",    items: "Carrot sticks, hummus, one apple", calories: 200 }
      ];
    } else if (w > 65) {
      return [
        { meal: "Breakfast", items: "Egg white omelette, whole wheat toast", calories: 340 },
        { meal: "Lunch",     items: "Turkey or tuna salad, fruit", calories: 450 },
        { meal: "Dinner",    items: "Baked salmon, roasted veggies, brown rice", calories: 480 },
        { meal: "Snacks",    items: "Low-fat yogurt, almonds", calories: 230 }
      ];
    } else {
      return [
        { meal: "Breakfast", items: "Spinach-banana protein smoothie", calories: 300 },
        { meal: "Lunch",     items: "Chicken wrap with veggies", calories: 430 },
        { meal: "Dinner",    items: "Veggie soup, whole grain bread", calories: 380 },
        { meal: "Snacks",    items: "Fruit bowl, few nuts", calories: 220 }
      ];
    }
  }

  if (goal === "muscle") {
    return [
      { meal: "Breakfast", items: "Scrambled eggs, oats with peanut butter, banana", calories: 550 },
      { meal: "Lunch",     items: "Chicken breast, sweet potato, broccoli", calories: 600 },
      { meal: "Dinner",    items: "Beef or tofu stir-fry, brown rice", calories: 580 },
      { meal: "Snacks",    items: "Protein shake, cottage cheese, fruit", calories: 350 }
    ];
  }

  // healthy living default
  return [
    { meal: "Breakfast", items: "Oatmeal with fruit and nuts", calories: 380 },
    { meal: "Lunch",     items: "Grilled chicken or tofu salad", calories: 500 },
    { meal: "Dinner",    items: "Whole grain pasta, side salad", calories: 520 },
    { meal: "Snacks",    items: "Mixed nuts, yogurt, fruit", calories: 300 }
  ];
}

function loadMealPlan(profile) {
  const raw = localStorage.getItem("mealPlanToday");
  if (!raw) return generateBaseMealPlan(profile);
  try {
    const plan = JSON.parse(raw);
    return Array.isArray(plan) && plan.length ? plan : generateBaseMealPlan(profile);
  } catch {
    localStorage.removeItem("mealPlanToday");
    return generateBaseMealPlan(profile);
  }
}

function renderMealPlan() {
  const container = document.getElementById("mealPlan");
  if (!container) return;

  const profile = getUserProfile();
  const plan = loadMealPlan(profile);

  const MEAL_ICONS = {
    "Breakfast": "🍳",
    "Lunch": "🥗",
    "Dinner": "🍝",
    "Snacks": "🍏"
  };

  container.innerHTML = "";

  plan.forEach((m) => {
    const icon = MEAL_ICONS[m.meal] || "🍽️";
    const card = document.createElement("div");
    card.className = "meal-card";
    card.innerHTML = `
      <div class="meal-card-header">
        <div class="meal-title-block">
          <span class="meal-icon">${icon}</span>
          <span class="meal-name">${m.meal}</span>
        </div>
        <span class="meal-cal">${m.calories} kcal (approx)</span>
      </div>
      <div class="meal-items">${m.items}</div>
    `;
    container.appendChild(card);
  });
}

// INIT
renderUpcoming();
renderMealPlan();
