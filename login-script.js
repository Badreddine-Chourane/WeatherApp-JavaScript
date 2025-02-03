const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginResult = document.getElementById("loginResult");

// Table of user data
const usersTable = [
  { email: "badreddine@gmail.com", password: "123456", name: "Badreddine", role: "Admin" },
  { email: "user2@example.com", password: "password2", name: "Bob", role: "Editor" },
  { email: "user3@example.com", password: "password3", name: "Charlie", role: "Viewer" },
  { email: "user4@example.com", password: "password4", name: "Dana", role: "Admin" },
];

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Find the user in the table
  const user = usersTable.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    // Successful login
    loginResult.style.color = "green";
    loginResult.textContent = `Login successful! Welcome, ${user.name} (${user.role}).`;
    setTimeout(() => {
      // Redirect to a new page or load content
      window.location.href = "index.html";
    }, 1500);
  } else {
    // Unsuccessful login
    loginResult.style.color = "red";
    loginResult.textContent = "Invalid email or password.";
  }
});
