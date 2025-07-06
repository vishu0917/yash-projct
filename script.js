// Theme toggle (from index.html)
const toggle = document.getElementById("modeToggle");
if (toggle) {
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
  });
}

// Quiz logic (in quiz.html)
const params = new URLSearchParams(window.location.search);
const subject = params.get("subject");

if (subject) {
  const quiz = quizData[subject];
  let current = 0;
  let score = 0;

  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("nextBtn");

  function loadQuestion() {
    nextBtn.disabled = true;
    const q = quiz[current];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.className = "option-btn";
      btn.onclick = () => {
        document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        nextBtn.disabled = false;
        if (opt === q.answer) {
          btn.dataset.correct = true;
        }
      };
      optionsEl.appendChild(btn);
    });
  }

  nextBtn.addEventListener("click", () => {
    const selected = document.querySelector(".option-btn.selected");
    if (selected?.dataset.correct) score++;
    current++;
    if (current < quiz.length) {
      loadQuestion();
    } else {
      localStorage.setItem("score", score);
      localStorage.setItem("total", quiz.length);
      window.location.href = "result.html";
    }
  });

  loadQuestion();
}
