// Weekly calorie data (same as before)
const calorieData = [220, 290, 350, 300, 406, 280, 240];

const ctx = document.getElementById("calorieGraph");
const totalEl = document.getElementById("caloriesTotal");
const stepsEl = document.getElementById("stepsToday");

// Total calories (sum of week)
const total = calorieData.reduce((a, b) => a + b, 0);
if (totalEl) {
  totalEl.textContent = `${total} kcal (this week)`;
}

// Demo steps value (or from localStorage)
const storedSteps = localStorage.getItem("stepsToday");
const steps = storedSteps ? Number(storedSteps) : 4320;
if (stepsEl) {
  stepsEl.textContent = steps.toLocaleString();
}

// Chart.js line graph
if (ctx) {
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Calories",
        data: calorieData,
        borderColor: "#fff3a2",
        borderWidth: 3,
        pointBackgroundColor: "#fff3a2",
        tension: 0.4
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { display: false },
        x: { display: false }
      }
    }
  });

  // Day selector highlight
  const daySpans = document.querySelectorAll(".day-selector span");
  daySpans.forEach((span, idx) => {
    span.addEventListener("click", () => {
      document.querySelector(".day-selector .active")?.classList.remove("active");
      span.classList.add("active");

      // Optionally highlight the selected point (just simple effect)
      chart.setActiveElements([{ datasetIndex: 0, index: idx }]);
      chart.tooltip.setActiveElements([{ datasetIndex: 0, index: idx }]);
      chart.update();
    });
  });
}
