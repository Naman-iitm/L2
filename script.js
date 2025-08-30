/* =====================================================
   LegalClear - Demystifying Legal Documents
   Author: Naman
   File: script.js
   ===================================================== */

// ========== GLOBAL VARIABLES ==========
const darkToggle = document.getElementById("darkToggle");
const navbarLinks = document.querySelectorAll(".nav-links a");
const uploadInput = document.getElementById("uploadInput");
const uploadedDocs = document.getElementById("uploadedDocs");
const faqItems = document.querySelectorAll(".faq-item h3");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const closeBtns = document.querySelectorAll(".close");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const dashboard = document.getElementById("dashboard");
const contactForm = document.getElementById("contactForm");

// ========== DARK MODE ==========
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    darkToggle.textContent = "☀️ Light Mode";
  } else {
    darkToggle.textContent = "🌙 Dark Mode";
  }
});

// ========== NAVBAR SCROLL HIGHLIGHT ==========
window.addEventListener("scroll", () => {
  let fromTop = window.scrollY;
  navbarLinks.forEach(link => {
    let section = document.querySelector(link.getAttribute("href"));
    if (
      section.offsetTop <= fromTop + 80 &&
      section.offsetTop + section.offsetHeight > fromTop + 80
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Smooth scroll
navbarLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ========== UPLOAD DOCUMENT ==========
uploadInput.addEventListener("change", () => {
  let file = uploadInput.files[0];
  if (file) {
    let listItem = document.createElement("li");
    listItem.textContent = `${file.name} (Uploaded Successfully ✅)`;
    uploadedDocs.appendChild(listItem);

    // Add to dashboard mock
    let card = document.createElement("div");
    card.classList.add("dash-card");
    card.innerHTML = `
      <h3>${file.name}</h3>
      <p>Document Status: <strong>Processed</strong></p>
      <p>Summary: Legal terms simplified and ready to read.</p>
    `;
    dashboard.appendChild(card);
  }
});

// ========== FAQ TOGGLE ==========
faqItems.forEach(faq => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("open");
    let ans = faq.nextElementSibling;
    ans.style.display = ans.style.display === "block" ? "none" : "block";
  });
});

// ========== LOGIN / SIGNUP ==========
loginBtn.addEventListener("click", () => {
  loginModal.style.display = "block";
});
signupBtn.addEventListener("click", () => {
  signupModal.style.display = "block";
});
closeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    loginModal.style.display = "none";
    signupModal.style.display = "none";
  });
});

signupForm.addEventListener("submit", e => {
  e.preventDefault();
  let username = document.getElementById("signupUsername").value;
  let password = document.getElementById("signupPassword").value;
  localStorage.setItem(username, password);
  alert("Signup successful! Please login.");
  signupModal.style.display = "none";
});

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  let username = document.getElementById("loginUsername").value;
  let password = document.getElementById("loginPassword").value;
  if (localStorage.getItem(username) === password) {
    alert("Login successful!");
    loginModal.style.display = "none";
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("signupBtn").style.display = "none";
    logoutBtn.style.display = "inline-block";
    dashboard.style.display = "grid";
  } else {
    alert("Invalid login credentials");
  }
});

logoutBtn.addEventListener("click", () => {
  alert("Logged out successfully!");
  document.getElementById("loginBtn").style.display = "inline-block";
  document.getElementById("signupBtn").style.display = "inline-block";
  logoutBtn.style.display = "none";
  dashboard.style.display = "none";
});

// ========== CONTACT FORM VALIDATION ==========
contactForm.addEventListener("submit", e => {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  alert("Message sent successfully! ✅");
  contactForm.reset();
});

// ========== DASHBOARD CARD HOVER ANIMATION ==========
document.addEventListener("mouseover", e => {
  if (e.target.classList.contains("dash-card")) {
    e.target.style.transform = "scale(1.05)";
    e.target.style.transition = "0.3s ease";
  }
});
document.addEventListener("mouseout", e => {
  if (e.target.classList.contains("dash-card")) {
    e.target.style.transform = "scale(1)";
  }
});

// ========== ESCAPE MODALS ==========
window.addEventListener("click", e => {
  if (e.target == loginModal || e.target == signupModal) {
    loginModal.style.display = "none";
    signupModal.style.display = "none";
  }
});
