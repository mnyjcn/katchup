const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const errorMsg = document.getElementById("errorMsg");


document.querySelectorAll(".password-field .toggle").forEach(toggle => {
  toggle.addEventListener("click", () => {
    const input = toggle.previousElementSibling;
    const type = input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
  });
});


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirm = confirmInput.value;

  errorMsg.textContent = "";

  if (!name || !email || !password || !confirm) {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  if (password !== confirm) {
    errorMsg.textContent = "Passwords do not match. Please try again.";
    return;
  }


  localStorage.setItem("fitnessUserName", name);

 
window.location.href = "setup.html";


});
