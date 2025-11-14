// Build 1–31 December 2025
const days = Array.from({ length: 31 }, (_, i) => {
  const num = i + 1;
  return {
    num,
    dateKey: `2025-12-${String(num).padStart(2, "0")}`
  };
});

// All trainers are Patricia Talla
const classesByDate = {
  "2025-12-11": [
    {
      title: "Pilates",
      time: "December 11, 8am",
      trainer: "Patricia Talla",
      color: "#ffc6ec"
    },
    {
      title: "Spin Class",
      time: "December 11, 10am",
      trainer: "Patricia Talla",
      color: "#fff4a8"
    },
    {
      title: "Marathon Training",
      time: "December 11, 12pm",
      trainer: "Patricia Talla",
      color: "#ffe9c6"
    },
    {
      title: "Swimming Session",
      time: "December 11, 3pm",
      trainer: "Patricia Talla",
      color: "#c6e5ff"
    },
    {
      title: "Pickleball Match",
      time: "December 11, 6pm",
      trainer: "Patricia Talla",
      color: "#d8ffc6"
    }
  ],
  "2025-12-08": [
    {
      title: "Morning Yoga",
      time: "December 8, 7am",
      trainer: "Patricia Talla",
      color: "#c6f4ff"
    },
    {
      title: "Evening HIIT",
      time: "December 8, 6pm",
      trainer: "Patricia Talla",
      color: "#ffd9c6"
    }
  ],
  "2025-12-09": [
    {
      title: "Marathon Fundamentals",
      time: "December 9, 6am",
      trainer: "Patricia Talla",
      color: "#ffe4c6"
    }
  ],
  "2025-12-10": [
    {
      title: "Swimming Endurance",
      time: "December 10, 5pm",
      trainer: "Patricia Talla",
      color: "#c6e5ff"
    }
  ],
  "2025-12-12": [
    {
      title: "Core Crusher",
      time: "December 12, 7pm",
      trainer: "Patricia Talla",
      color: "#ffd1f2"
    }
  ],
  "2025-12-13": [
    {
      title: "Boxing Basics",
      time: "December 13, 2pm",
      trainer: "Patricia Talla",
      color: "#ffe59f"
    }
  ],
  "2025-12-14": [
    {
      title: "Sunday Stretch",
      time: "December 14, 9am",
      trainer: "Patricia Talla",
      color: "#d0ffe4"
    }
  ]
};

const dateRow = document.getElementById("dateRow");
const classesList = document.getElementById("classesList");
const dateText = document.getElementById("dateText");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let activeIndex = days.findIndex((d) => d.num === 11); // default 11th
let activeDateKey = days[activeIndex].dateKey;

// Create date pills
days.forEach((d, index) => {
  const pill = document.createElement("button");
  pill.className = "date-pill";
  pill.textContent = d.num;
  pill.dataset.dateKey = d.dateKey;
  pill.dataset.index = index;

  pill.addEventListener("click", () => {
    setActiveDay(index);
  });

  dateRow.appendChild(pill);
});

function updateHeaderDate(dayObj) {
  dateText.textContent = `DECEMBER ${dayObj.num}, 2025`;
}

function updateActivePill() {
  document.querySelectorAll(".date-pill").forEach((pill) => {
    const index = Number(pill.dataset.index);
    pill.classList.toggle("active", index === activeIndex);
  });
}

function renderClasses() {
  classesList.innerHTML = "";
  const items = classesByDate[activeDateKey] || [];

  if (!items.length) {
    classesList.innerHTML =
      '<p style="font-size:0.9rem;opacity:0.7;">No classes for this day.</p>';
    return;
  }

  items.forEach((c) => {
    const card = document.createElement("div");
    card.className = "class-card";
    card.style.background = c.color;

    card.innerHTML = `
      <div class="top-row">${c.time}</div>
      <div class="class-title">${c.title}</div>
      <div class="trainer">Trainer: ${c.trainer}</div>
      <div class="card-extra">
        <div class="book-btn">Book Here!</div>
      </div>
    `;

    // Only the "Book Here!" button redirects
    card.querySelector(".book-btn").addEventListener("click", () => {
      localStorage.setItem(
        "selectedClass",
        JSON.stringify({
          ...c,
          dateKey: activeDateKey
        })
      );
      window.location.href = "booking.html";
    });

    classesList.appendChild(card);
  });
}

function setActiveDay(index) {
  activeIndex = index;
  const dayObj = days[activeIndex];
  activeDateKey = dayObj.dateKey;

  updateHeaderDate(dayObj);
  updateActivePill();
  renderClasses();

  const pill = document.querySelector(`.date-pill[data-index="${index}"]`);
  if (pill) {
    pill.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }
}

// Arrow buttons
prevBtn.addEventListener("click", () => {
  if (activeIndex > 0) {
    setActiveDay(activeIndex - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (activeIndex < days.length - 1) {
    setActiveDay(activeIndex + 1);
  }
});

// Initial render
setActiveDay(activeIndex);
