const form = document.querySelector("form");
const userData = [];
let id = 1;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //get form data
  const fullName = form.fullName.value;
  const email = form.email.value;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  //validation
  //name validation
  function fName(fName) {
    if (typeof fName !== "string") {
      return alert("Name required - only alphabet's");
    }
  }

  //email validation
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    return alert("Invalid email address - Try this eg: example@example.com");
  }

  //password validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (
    !passwordRegex.test(password) ||
    password === fullName ||
    password === email
  ) {
    return alert(
      "Password should have at least 1 capital letter, 1 small, 1 number and 1 special characters, but password cannot be the same as name or email"
    );
  }
  //confirm password
  if (password !== confirmPassword) {
    alert("Password and confirm password should be the same");
  }

  // check if the email already exists
  const existingUser = userData.find((user) => user.email === email);
  if (existingUser) {
    alert("This email is already registered. Please use a different email.");
    return;
  }

  // store data
  userData.push({ id, fullName, email, password });
  id++;
  localStorage.setItem("userData", JSON.stringify(userData));

  if (userData.push({ id, fullName, email, password })) {
    window.location.href = "login.html";
  }
  console.log(fullName);
  console.log(email);
  console.log(password);
  console.log(confirmPassword);
  form.reset();
});
