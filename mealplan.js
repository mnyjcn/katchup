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
  // same as home.js (keep it consistent)
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
        { meal: "Dinner",    items: "Tofu/fish stir-fry, cauliflower rice", calories: 420 },
        { meal: "Snacks",    items: "Carrot sticks, hummus, apple", calories: 200 }
      ];
    } else if (w > 65) {
      return [
        { meal: "Breakfast", items: "Egg white omelette, whole wheat toast", calories: 340 },
        { meal: "Lunch",     items: "Turkey/tuna salad, fruit", calories: 450 },
        { meal: "Dinner",    items: "Salmon, roasted veggies, brown rice", calories: 480 },
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
      { meal: "Breakfast", items: "Scrambled eggs, oats + peanut butter, banana", calories: 550 },
      { meal: "Lunch",     items: "Chicken breast, sweet potato, broccoli", calories: 600 },
      { meal: "Dinner",    items: "Beef/tofu stir-fry, brown rice", calories: 580 },
      { meal: "Snacks",    items: "Protein shake, cottage cheese, fruit", calories: 350 }
    ];
  }

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

function saveMealPlan(plan) {
  localStorage.setItem("mealPlanToday", JSON.stringify(plan));
}

let currentPlan = [];

function renderEditList() {
  const container = document.getElementById("editMealList");
  if (!container) return;

  container.innerHTML = "";

  currentPlan.forEach((m, index) => {
    const card = document.createElement("div");
    card.className = "edit-meal-card";
    card.dataset.index = index;

    card.innerHTML = `
      <div class="edit-meal-header">
        <span class="edit-meal-title">${m.meal}</span>
        <span class="edit-meal-cal">${m.calories} kcal</span>
      </div>
      <div class="edit-meal-items">${m.items}</div>
      <div class="edit-btn-row">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    container.appendChild(card);
  });

  // Hook up edit/delete
  container.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".edit-meal-card");
      const idx = Number(card.dataset.index);
      const meal = currentPlan[idx];

      const newItems = prompt(`Edit items for ${meal.meal}:`, meal.items);
      if (!newItems || !newItems.trim()) return;

      const newCalStr = prompt(`Edit calories for ${meal.meal}:`, meal.calories);
      const newCal = parseInt(newCalStr, 10);
      if (isNaN(newCal)) return;

      currentPlan[idx].items = newItems.trim();
      currentPlan[idx].calories = newCal;
      saveMealPlan(currentPlan);
      renderEditList();
    });
  });

  container.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".edit-meal-card");
      const idx = Number(card.dataset.index);
      if (!confirm(`Remove ${currentPlan[idx].meal} from your plan?`)) return;
      currentPlan.splice(idx, 1);
      saveMealPlan(currentPlan);
      renderEditList();
    });
  });
}

function setupAddMeal() {
  const addBtn = document.getElementById("addMealBtn");
  if (!addBtn) return;

  addBtn.addEventListener("click", () => {
    const mealName = prompt("Meal name (e.g. Brunch, Pre-workout):");
    if (!mealName || !mealName.trim()) return;

    const items = prompt("What foods are in this meal?");
    if (!items || !items.trim()) return;

    const calStr = prompt("Approximate calories for this meal:");
    const cal = parseInt(calStr, 10);
    if (isNaN(cal)) return;

    currentPlan.push({
      meal: mealName.trim(),
      items: items.trim(),
      calories: cal
    });

    saveMealPlan(currentPlan);
    renderEditList();
  });
}

// INIT
(function init() {
  const profile = getUserProfile();
  currentPlan = loadMealPlan(profile);
  renderEditList();
  setupAddMeal();
})();
