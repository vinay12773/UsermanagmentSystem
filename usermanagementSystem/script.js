// script.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const pwBar = document.getElementById("pwBar");
  const pwHelp = document.getElementById("pwHelp");
  const matchError = document.getElementById("matchError");
  const ageInput = document.getElementById("age");
  const ageError = document.getElementById("ageError");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  // ✅ Password Strength Checker
  password.addEventListener("input", () => {
    const value = password.value;
    let strength = 0;

    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[a-z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;

    const percent = (strength / 5) * 100;
    pwBar.style.width = percent + "%";

    if (percent < 40) {
      pwBar.style.background = "red";
      pwHelp.textContent = "Weak password";
    } else if (percent < 80) {
      pwBar.style.background = "orange";
      pwHelp.textContent = "Moderate password";
    } else {
      pwBar.style.background = "green";
      pwHelp.textContent = "Strong password";
    }
  });

  // ✅ Confirm Password Validation
  confirmPassword.addEventListener("input", () => {
    if (confirmPassword.value !== password.value) {
      matchError.style.display = "block";
      matchError.textContent = "Passwords do not match!";
    } else {
      matchError.style.display = "none";
    }
  });

  // ✅ Age Validation
  ageInput.addEventListener("input", () => {
    let age = parseInt(ageInput.value, 10);
    if (age > 100) {
      ageError.style.display = "block";
      ageError.textContent = "Age cannot be greater than 100!";
      ageInput.value = 100;
    } else {
      ageError.style.display = "none";
    }
  });

  // ✅ Gmail Validation
  emailInput.addEventListener("input", () => {
    const emailValue = emailInput.value.trim();

    if (emailValue && !emailValue.endsWith("@gmail.com")) {
      emailError.style.display = "block";
      emailError.textContent = "Email must end with '@gmail.com'";
    } else {
      emailError.style.display = "none";
    }
  });

  // ✅ Form Submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Basic HTML validation
    if (!form.checkValidity()) {
      alert("Please fill out all required fields correctly.");
      return;
    }

    // Check age again
    const ageValue = parseInt(ageInput.value, 10);
    if (ageValue > 100) {
      alert("Age cannot be more than 100!");
      return;
    }

    // Check Gmail domain
    const emailValue = emailInput.value.trim();
    if (!emailValue.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address (must end with @gmail.com)");
      return;
    }

    // Check password match
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      return;
    }

    // All good — Save data
    const userData = {
      fullName: form.fullName.value,
      age: ageValue,
      email: emailValue,
      role: form.role.value,
      gender: form.gender.value,
    };

    console.log("User Data Saved:", userData);
    alert("User details saved successfully!");

    form.reset();
    pwBar.style.width = "0";
    pwHelp.textContent = "";
    matchError.style.display = "none";
    ageError.style.display = "none";
    emailError.style.display = "none";
  });
});
