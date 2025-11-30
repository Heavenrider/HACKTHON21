// CHANGE THIS TO YOUR WHATSAPP NUMBER (with country code, no +)
const WHATSAPP_NUMBER = "919100607138"; // ← CHANGE THIS!

const careers = {
  software: { title: "Software Engineering", img: "https://images.unsplash.com/photo-1517180107641-dc70e7ea90b8?w=1200", desc: "Build apps, websites, AI systems", exam: "JEE Main/Advanced, BITSAT", skills: ["Python","JavaScript","React"], colleges: ["IIT Bombay","IIT Delhi","BITS Pilani"], salary: "₹8–40 LPA", future: "100% placement" },
  medicine: { title: "Medicine & Healthcare", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200", desc: "Become a doctor and save lives", exam: "NEET-UG", skills: ["Biology","Chemistry"], colleges: ["AIIMS Delhi","CMC Vellore"], salary: "₹12–50 LPA", future: "Evergreen" },
  ca: { title: "Chartered Accountancy", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200", desc: "Master finance and taxation", exam: "CA Foundation → Final", skills: ["Accounting","Tax"], colleges: ["ICAI"], salary: "₹8–30 LPA", future: "High earning" },
  law: { title: "Law Studies", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200", desc: "Become lawyer or judge", exam: "CLAT, AILET", skills: ["Reading","Argument"], colleges: ["NLSIU","NALSAR"], salary: "₹8–40 LPA", future: "Growing" },
  design: { title: "UI/UX Design", img: "https://images.unsplash.com/photo-1558655146-9f40138ed1cb?w=1200", desc: "Design beautiful apps", exam: "NID, UCEED", skills: ["Figma","Creativity"], colleges: ["NID","NIFT"], salary: "₹6–25 LPA", future: "Fast growing" },
  data: { title: "Data Science & AI", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200", desc: "Work with AI and Big Data", exam: "JEE", skills: ["Python","ML"], colleges: ["IITs","IISc"], salary: "₹12–50 LPA", future: "Future job" },
  ias: { title: "Civil Services (IAS)", img: "https://images.unsplash.com/photo-1589820288219-0b3d26e03fc5?w=1200", desc: "Serve India as IAS/IPS", exam: "UPSC CSE", skills: ["GK","Writing"], colleges: ["Any degree"], salary: "₹8–25 LPA + power", future: "Most respected" },
  commerce: { title: "B.Com + MBA Finance", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200", desc: "Investment banking", exam: "CUET, IPMAT", skills: ["Finance","Excel"], colleges: ["SRCC","NMIMS"], salary: "₹10–40 LPA", future: "High growth" },
  teaching: { title: "Teaching & Education", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200", desc: "Become teacher/professor", exam: "B.Ed, CTET", skills: ["Teaching"], colleges: ["DU","JMI"], salary: "₹5–20 LPA", future: "Respected" },
  defence: { title: "Defence Forces", img: "https://images.unsplash.com/photo-1567454483476-3c33b2c2d1e7?w=1200", desc: "Join Army/Navy/Air Force", exam: "NDA, CDS", skills: ["Fitness"], colleges: ["NDA","IMA"], salary: "₹10–25 LPA + perks", future: "Lifetime respect" },
  fashion: { title: "Fashion Design", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200", desc: "Design clothes & lifestyle", exam: "NIFT", skills: ["Creativity"], colleges: ["NIFT Delhi"], salary: "₹5–25 LPA", future: "Growing" },
  aviation: { title: "Commercial Pilot", img: "https://images.unsplash.com/photo-1506947411487-a5673821d968?w=1200", desc: "Fly passenger aircraft", exam: "DGCA Exams", skills: ["Physics"], colleges: ["Indigo Cadet"], salary: "₹20L–2Cr/year", future: "High demand" }
};

// Theme
document.getElementById('themeSwitch').addEventListener('change', function() {
  document.body.classList.toggle('dark', this.checked);
  localStorage.setItem('theme', this.checked ? 'dark' : 'light');
});

window.onload = function() {
  const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.body.classList.toggle('dark', saved === 'dark');
  document.getElementById('themeSwitch').checked = saved === 'dark';

  if (localStorage.getItem('loggedIn') === 'true') {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('mainHeader').style.display = 'block';
  }
};

// Auth Forms
function showSignup() {
  document.getElementById('loginBox').style.display = 'none';
  document.getElementById('signupBox').style.display = 'block';
}
function showLogin() {
  document.getElementById('signupBox').style.display = 'none';
  document.getElementById('loginBox').style.display = 'block';
}

// Password Strength
document.getElementById('signupPassword').addEventListener('input', updateStrength);
document.getElementById('signupConfirmPassword').addEventListener('input', checkMatch);

function updateStrength() {
  const pwd = this.value;
  let strength = 0;
  if (pwd.length >= 8) strength += 25;
  if (/[A-Z]/.test(pwd)) strength += 25;
  if (/[0-9]/.test(pwd)) strength += 25;
  if (/[^A-Za-z0-9]/.test(pwd)) strength += 25;
  document.getElementById('passwordStrength').innerHTML = `<div style="height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin:15px 0;"><div style="width:${strength}%;height:100%;background:${strength<50?'#ef4444':strength<80?'#f59e0b':'#10b981'};transition:0.4s;"></div></div>`;
  checkMatch();
}

function checkMatch() {
  const pwd = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirmPassword').value;
  const btn = document.getElementById('signupBtn');
  const match = pwd === confirm && pwd.length >= 8;
  btn.disabled = !match;
  document.getElementById('passMatch').style.display = match ? 'block' : 'none';
  document.getElementById('passError').style.display = match ? 'none' : 'block';
}

// Signup & Login
function signup() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const newUser = {
    name: document.getElementById('signupName').value,
    email: document.getElementById('signupEmail').value,
    username: document.getElementById('signupUsername').value,
    password: document.getElementById('signupPassword').value
  };
  if (users.find(u => u.username === newUser.username || u.email === newUser.email)) {
    document.getElementById('signupError').textContent = "Username or Email already exists!";
    return;
  }
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  alert("Account created successfully!");
  showLogin();
}

function login() {
  const id = document.getElementById('loginUsername').value;
  const pwd = document.getElementById('loginPassword').value;
  
  if (id === "admin" && pwd === "admin123") {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    loadAdminData();
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => (u.username === id || u.email === id) && u.password === pwd);
  
  if (user) {
    localStorage.setItem('loggedIn', 'true');
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('mainHeader').style.display = 'block';
  } else {
    document.getElementById('loginError').textContent = "Invalid credentials!";
  }
}

function adminLogin() {
  const u = prompt("Admin Username:");
  const p = prompt("Admin Password:");
  if (u === "admin" && p === "admin123") {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    loadAdminData();
  } else alert("Access Denied!");
}

function loadAdminData() {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  document.getElementById('totalBookings').textContent = bookings.length;
  document.getElementById('bookingList').innerHTML = bookings.length === 0 
    ? "<p>No bookings yet.</p>" 
    : bookings.reverse().map(b => `<div style="background:#f8fafc;padding:20px;margin:15px 0;border-radius:12px;"><strong>${b.name}</strong><br>${b.phone} | ${b.date} ${b.time}<br><small>${b.timestamp}</small></div>`).join('');
}

function logout() {
  localStorage.removeItem('loggedIn');
  location.reload();
}

function openCareer(key) {
  const c = careers[key];
  document.documentElement.style.setProperty('--bg-img', `url(${c.img})`);
  document.getElementById('modalTitle').textContent = c.title;
  document.getElementById('careerName').textContent = c.title;
  document.getElementById('careerDesc').textContent = c.desc;
  document.getElementById('examInfo').textContent = c.exam;
  document.getElementById('salaryInfo').textContent = c.salary;
  document.getElementById('futureInfo').textContent = c.future;
  document.getElementById('collegesList').innerHTML = c.colleges.map(col => `<li>${col}</li>`).join('');
  document.getElementById('skillsList').innerHTML = c.skills.map(skill => `<li>${skill}</li>`).join('');
  document.getElementById('careerModal').style.display = 'flex';
}

function openBooking() {
  document.getElementById('bookingModal').style.display = 'flex';
}

function bookViaWhatsApp(e) {
  e.preventDefault();
  const name = document.getElementById('bookName').value;
  const phone = document.getElementById('bookPhone').value;
  const email = document.getElementById('bookEmail').value;
  const date = document.getElementById('bookDate').value;
  const time = document.getElementById('bookTime').value;
  const message = document.getElementById('bookMessage').value;

  // Save booking
  const booking = { name, phone, email, date, time, message, timestamp: new Date().toLocaleString() };
  let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));

  // WhatsApp message
  let text = `Hello RightPath!%0A%0AI want to book a FREE career guidance session%0A%0A`;
  text += `Name: ${name}%0A`;
  text += `Phone: ${phone}%0A`;
  if(email) text += `Email: ${email}%0A`;
  text += `Date: ${date}%0A`;
  text += `Time: ${time}%0A`;
  if(message) text += `%0ADoubt: ${message}%0A`;
  text += `%0AThank you!`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  closeModal();
  document.getElementById('successModal').style.display = 'flex';
}

function closeModal() {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
}

window.onclick = function(e) {
  if (e.target.classList.contains('modal')) closeModal();
};
