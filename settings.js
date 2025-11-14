// HI [NAME] HEADER IN SETTINGS
const settingsHi = document.getElementById("hiSettings");
const settingsName = document.getElementById("nameSettings");
const savedName = localStorage.getItem("fitnessUserName");

if (savedName && settingsName) {
  settingsHi.textContent = "Hi!";
  settingsName.textContent = savedName + ",";
}


// ===== PROFILE PICTURE =====
const profileWrapper = document.getElementById("profileWrapper");
const fileInput = document.getElementById("profileFileInput");
const previewImg = document.getElementById("settingsProfilePreview");

// Load existing profile image if any
const existingImage = localStorage.getItem("profileImageData");
if (existingImage && previewImg) {
  previewImg.src = existingImage;
}

// Clicking the circle opens file picker
if (profileWrapper && fileInput) {
  profileWrapper.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const dataUrl = e.target.result;
      localStorage.setItem("profileImageData", dataUrl);

      if (previewImg) {
        previewImg.src = dataUrl;
      }

      alert("Profile picture updated!");
    };
    reader.readAsDataURL(file);
  });
}

// ===== NAME, HEIGHT, WEIGHT =====
const nameInput = document.getElementById("settingsName");
const heightInput = document.getElementById("settingsHeight");
const weightInput = document.getElementById("settingsWeight");

// Name from register
const storedName = localStorage.getItem("fitnessUserName");
if (nameInput) {
  nameInput.value = storedName || "";
  nameInput.addEventListener("input", () => {
    localStorage.setItem("fitnessUserName", nameInput.value.trim());
  });
}

// Profile (height, weight) from setup
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

function saveUserProfile(profile) {
  localStorage.setItem("userProfile", JSON.stringify(profile));
}

let profile = getUserProfile() || { weightKg: "", heightCm: "", goal: "healthy" };

if (heightInput) {
  if (profile.heightCm) heightInput.value = profile.heightCm;
  heightInput.addEventListener("input", () => {
    profile.heightCm = heightInput.value ? Number(heightInput.value) : "";
    saveUserProfile(profile);
  });
}

if (weightInput) {
  if (profile.weightKg) weightInput.value = profile.weightKg;
  weightInput.addEventListener("input", () => {
    profile.weightKg = weightInput.value ? Number(weightInput.value) : "";
    saveUserProfile(profile);
  });
}
