/* ====== EDIT YOUR DETAILS HERE ====== */
const D = {
  name: "Bhavy Dave",
  roles: ["Web Developer", "UI Designer", "Problem Solver", "Fast Learner"],
  about: "I'm a 2nd year B.Tech CSE student at JG University. I love turning ideas into fast, good looking websites and I'm always learning something new.",
  stats: [[10, "Projects built"], [3, "Years learning"], [500, "Commits"], [5, "Certificates"]],
  skills: ["HTML5", "CSS3", "JavaScript", "Git", "GitHub", "Responsive Design", "Animations", "APIs", "Figma"],
  projects: [
    { t: "Personal Blog", d: "A responsive blog with a clean grid layout and dark mode.", tags: ["HTML", "CSS"], cat: "Web", link: "#" },
    { t: "Task Manager", d: "Add, edit and complete tasks. Data is saved in the browser.", tags: ["JavaScript", "Storage"], cat: "JavaScript", link: "#" },
    { t: "Weather App", d: "Search any city and see live weather from a public API.", tags: ["JavaScript", "API"], cat: "JavaScript", link: "#" },
    { t: "Restaurant Page", d: "Mobile first landing page with a menu and booking form.", tags: ["HTML", "CSS"], cat: "Web", link: "#" }
  ],
  edu: [["2025 - Now", "B.Tech in CSE (2nd Year)", "JG University"], ["Before college", "10th Standard", ""], ["2023", "Web Development Course", "Online / Certificate"]],
  email: "you@example.com"
};

/* ====== BUILD PAGE ====== */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const secs = ["about", "skills", "projects", "journey", "contact"];
const cats = ["All", ...new Set(D.projects.map(p => p.cat))];
const pills = [...D.skills, ...D.skills].map(s => `<span class="pill">${s}</span>`).join("");
$("#app").innerHTML = `
<header><a class="logo" href="#top">${D.name.split(" ")[0]}<span style="color:var(--c)">.</span></a>
  <nav id="nav">${secs.map(s => `<a href="#${s}">${s[0].toUpperCase() + s.slice(1)}</a>`).join("")}</nav>
  <button class="ic" id="theme" aria-label="Switch theme">&#9680;</button><button class="ic" id="burger" aria-label="Menu">&#9776;</button></header>
<section class="hero" id="top"><div class="blob one"></div><div class="blob two"></div>
  <p class="hi">Hello, I'm</p><h1 id="name">${D.name}</h1>
  <p class="role">I am a <span id="typed"></span></p>
  <div class="btns"><a class="btn" href="#projects">View my work</a><a class="btn ghost" href="#contact">Hire me</a></div>
  <span class="scroll">Scroll down &#8595;</span></section>
<section id="about" class="rv"><h2>About <i>me</i></h2><div class="about"><p class="glass">${D.about}</p>
  <div class="stats">${D.stats.map(s => `<div class="glass stat"><b data-n="${s[0]}">0</b><span>${s[1]}</span></div>`).join("")}</div></div></section>
<section id="skills" class="rv"><h2>My <i>skills</i></h2><div class="marq"><div class="track">${pills}</div></div></section>
<section id="projects" class="rv"><h2>Featured <i>projects</i></h2>
  <div class="filters">${cats.map((c, i) => `<button class="chip${i ? "" : " on"}" data-f="${c}">${c}</button>`).join("")}</div>
  <div class="grid">${D.projects.map(p => `<article class="glass card" data-c="${p.cat}"><h3>${p.t}</h3><p>${p.d}</p>${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}<br><a href="${p.link}" target="_blank" rel="noopener">View on GitHub &#8599;</a></article>`).join("")}</div></section>
<section id="journey" class="rv"><h2>My <i>journey</i></h2><div class="tl">${D.edu.map(e => `<div><b>${e[0]}</b><h3>${e[1]}</h3><p>${e[2]}</p></div>`).join("")}</div></section>
<section id="contact" class="rv"><h2>Let's <i>talk</i></h2><form class="glass" id="form" novalidate>
  <input id="n" placeholder="Your name" aria-label="Name"><input id="e" type="email" placeholder="Your email" aria-label="Email">
  <textarea id="m" rows="4" placeholder="Your message" aria-label="Message"></textarea><p id="msg" role="status"></p>
  <button class="btn" type="submit">Send message</button></form></section>
<footer>&copy; ${new Date().getFullYear()} ${D.name}. Designed and coded with HTML, CSS and JavaScript.</footer>`;

/* ====== EFFECTS ====== */
// Theme (remembered)
const root = document.documentElement;
try { root.dataset.theme = localStorage.getItem("t") || "dark"; } catch (e) {}
$("#theme").onclick = () => { root.dataset.theme = root.dataset.theme == "dark" ? "light" : "dark"; try { localStorage.setItem("t", root.dataset.theme); } catch (e) {} };
$("#burger").onclick = () => $("#nav").classList.toggle("open");
$$("#nav a").forEach(a => a.onclick = () => $("#nav").classList.remove("open"));

// Scramble text on the name
const nameEl = $("#name"), chars = "!<>-_/[]{}=+*^?#";
function scramble() {
  let f = 0; const t = setInterval(() => {
    nameEl.textContent = [...D.name].map((c, i) => c == " " ? c : i < f / 2 ? c : chars[Math.random() * chars.length | 0]).join("");
    if (++f > D.name.length * 2) { clearInterval(t); nameEl.textContent = D.name; }
  }, 40);
}
scramble(); nameEl.onmouseenter = scramble;

// Typing roles
let r = 0, k = 0, del = false; const ty = $("#typed");
(function type() {
  const w = D.roles[r]; ty.textContent = w.slice(0, k);
  if (!del && k == w.length) { del = true; return setTimeout(type, 1300); }
  if (del && k == 0) { del = false; r = (r + 1) % D.roles.length; }
  k += del ? -1 : 1; setTimeout(type, del ? 45 : 95);
})();

// Scroll progress, active nav link
addEventListener("scroll", () => {
  $("#progress").style.width = scrollY / (document.body.scrollHeight - innerHeight) * 100 + "%";
  let cur = ""; secs.forEach(s => { if ($("#" + s).getBoundingClientRect().top < innerHeight / 2) cur = s; });
  $$("#nav a").forEach(a => a.classList.toggle("on", a.hash == "#" + cur));
});

// Reveal sections and count up numbers
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; e.target.classList.add("in"); io.unobserve(e.target);
  $$("[data-n]", e.target).forEach(b => { let n = 0, end = +b.dataset.n; const t = setInterval(() => { n += Math.ceil(end / 40); if (n >= end) { n = end; clearInterval(t); } b.textContent = n + "+"; }, 35); });
}), { threshold: .15 });
$$(".rv").forEach(el => io.observe(el));

// Project filter
$$(".chip").forEach(c => c.onclick = () => {
  $$(".chip").forEach(x => x.classList.remove("on")); c.classList.add("on");
  $$(".card").forEach(card => card.classList.toggle("hide", c.dataset.f != "All" && card.dataset.c != c.dataset.f));
});

// 3D tilt + glow on cards
$$(".card").forEach(card => {
  card.onmousemove = e => { const b = card.getBoundingClientRect(), x = e.clientX - b.left, y = e.clientY - b.top;
    card.style.transform = `perspective(700px) rotateX(${(y / b.height - .5) * -14}deg) rotateY(${(x / b.width - .5) * 14}deg) scale(1.03)`;
    card.style.setProperty("--x", x + "px"); card.style.setProperty("--y", y + "px"); };
  card.onmouseleave = () => card.style.transform = "";
});

// Custom cursor
const cur = $("#cursor");
addEventListener("mousemove", e => { cur.style.transform = `translate(${e.clientX - 17}px,${e.clientY - 17}px)`; cur.classList.toggle("big", !!e.target.closest("a,button,.card")); });

// Contact form
$("#form").onsubmit = e => {
  e.preventDefault(); let ok = true;
  $$("#form input,#form textarea").forEach(f => { const bad = !f.value.trim() || (f.type == "email" && !/^\S+@\S+\.\S+$/.test(f.value)); f.classList.toggle("bad", bad); if (bad) ok = false; });
  $("#msg").textContent = ok ? "Thanks! I will reply soon." : "Please fill all fields with a valid email.";
  $("#msg").style.color = ok ? "var(--b)" : "var(--c)"; if (ok) e.target.reset();
};

// Interactive particle background
const cv = $("#bg"), ctx = cv.getContext("2d"); let W, H, P = [], mx = -999, my = -999;
function size() { W = cv.width = innerWidth; H = cv.height = innerHeight; P = Array.from({ length: Math.min(90, W / 14 | 0) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: Math.random() - .5, vy: Math.random() - .5 })); }
size(); addEventListener("resize", size);
addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
(function draw() {
  ctx.clearRect(0, 0, W, H);
  const dark = root.dataset.theme == "dark", col = dark ? "150,140,255" : "91,61,245";
  P.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
    const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy); if (d < 120) { p.x += dx / d * 2; p.y += dy / d * 2; }
    ctx.fillStyle = `rgba(${col},.8)`; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, 7); ctx.fill();
    for (let j = i + 1; j < P.length; j++) { const q = P[j], l = Math.hypot(p.x - q.x, p.y - q.y); if (l < 130) { ctx.strokeStyle = `rgba(${col},${.35 - l / 400})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); } }
  });
  requestAnimationFrame(draw);
})();
