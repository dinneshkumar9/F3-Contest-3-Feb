const form = document.querySelector("#form");
const welcomeName = document.querySelector("#welcomeName");
const welcomeEmail = document.querySelector("#welcomeEmail");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userData = JSON.parse(localStorage.getItem("userData"));

// check if currentUser exists, if not redirect to login page
if (!currentUser) {
  window.location.href = "login.html";
}

// find the current user in the userData array
const user = userData.find((user) => user.email === currentUser.email);

// display welcome message with user's name and email
welcomeName.textContent = `Welcome ${user.fullName}!`;
welcomeEmail.textContent = `Email: ${user.email}`;

// handle change password button click
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const oldPassword = form.elements[0].value;
  const newPassword = form.elements[1].value;
  const confirmNewPassword = form.elements[2].value;

  // check if old password matches user's current password
  if (oldPassword !== user.password) {
    alert("Old password is incorrect.");
    return;
  }

  // check if new password and confirm new password match
  if (newPassword !== confirmNewPassword) {
    alert("New password and confirm password do not match.");
    return;
  }

  // update user's password in the userData array
  userData.forEach((u) => {
    if (u.email === user.email) {
      u.password = newPassword;
    }
  });

  // update userData in localStorage
  localStorage.setItem("userData", JSON.stringify(userData));
  alert("Password changed successfully.");

  // reset form fields
  form.reset();
});

// handle logout button click
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  //localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});
