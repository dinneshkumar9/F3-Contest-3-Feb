const form = document.querySelector("form");
const userData = JSON.parse(localStorage.getItem("userData")) || [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // get form data
  const email = form.email.value;
  const password = form.password.value;

  // find the user with the entered email
  const user = userData.find((user) => user.email === email);

  // check if the user exists and the entered password matches
  if (!user || user.password !== password) {
    alert("Invalid email or password");
    return;
  } else {
    // generate a token
    const token = generateToken();

    // add the token to the user object
    user.token = token;

    // store the updated user object in the userData array
    const index = userData.indexOf(user);
    userData[index] = user;

    // store the userData in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    // store the currentUser in localStorage
    const currentUser = { email: user.email, name: user.fullName, token };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // redirect the user to the next page
    window.location.href = "dashboard.html";
  }
});

// function to generate a random token
function generateToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 16; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}
