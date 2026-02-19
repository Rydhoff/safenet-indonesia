document.addEventListener("DOMContentLoaded", () => {

    /* ========================
       QUIZ DATA
    ======================== */
    const quizData = [
        {
            question: "Apa yang sebaiknya dilakukan jika menerima email mencurigakan?",
            options: [
                "Membalas email",
                "Klik link",
                "Abaikan dan hapus",
                "Teruskan ke teman"
            ],
            answer: 2
        },
        {
            question: "Password yang aman sebaiknya?",
            options: [
                "Nama sendiri",
                "Tanggal lahir",
                "Kombinasi huruf, angka, simbol",
                "Sama semua akun"
            ],
            answer: 2
        },
        {
            question: "Apa fungsi 2FA?",
            options: [
                "Mempercepat login",
                "Menambah keamanan",
                "Menghapus akun",
                "Menyimpan data"
            ],
            answer: 1
        },
        {
            question: "Sebelum membagikan informasi, sebaiknya?",
            options: [
                "Langsung share",
                "Cek sumber",
                "Ikuti komentar",
                "Sebarkan"
            ],
            answer: 1
        },
        {
            question: "Data yang tidak boleh dibagikan?",
            options: [
                "Hobi",
                "Makanan favorit",
                "OTP dan alamat rumah",
                "Film favorit"
            ],
            answer: 2
        }
    ];

    /* ========================
       SHUFFLE SOAL
    ======================== */
    quizData.sort(() => Math.random() - 0.5);

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    /* ========================
       ELEMENTS
    ======================== */
    const quizBox = document.getElementById("quiz-box");
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const progressEl = document.getElementById("progress");
    const scoreEl = document.getElementById("score");
    const nextBtn = document.getElementById("nextBtn");
    const resetBtn = document.getElementById("resetQuiz");

    /* ========================
       LOAD QUESTION
    ======================== */
    function loadQuestion() {
        answered = false;
        nextBtn.disabled = true;
        optionsEl.innerHTML = "";

        // animasi fade
        quizBox.classList.remove("fade");
        void quizBox.offsetWidth; // trigger reflow
        quizBox.classList.add("fade");

        const q = quizData[currentQuestion];

        questionEl.textContent = q.question;
        progressEl.textContent = `Soal ${currentQuestion + 1} dari ${quizData.length}`;
        scoreEl.textContent = `Skor: ${score}`;

        q.options.forEach((option, index) => {
            const li = document.createElement("li");
            li.textContent = option;

            li.addEventListener("click", () => {
                if (answered) return;
                answered = true;

                const allOptions = optionsEl.querySelectorAll("li");
                allOptions.forEach(item => {
                    item.style.pointerEvents = "none";
                });

                if (index === q.answer) {
                    li.classList.add("correct");
                    score++;
                } else {
                    li.classList.add("wrong");
                    allOptions[q.answer].classList.add("correct");
                }

                scoreEl.textContent = `Skor: ${score}`;
                nextBtn.disabled = false;
            });

            optionsEl.appendChild(li);
        });
    }

    /* ========================
       NEXT BUTTON
    ======================== */
    nextBtn.addEventListener("click", () => {
        currentQuestion++;

        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            questionEl.textContent = "🎉 Kuis selesai!";
            optionsEl.innerHTML = "";
            progressEl.textContent = "";
            scoreEl.textContent = `Skor akhir kamu: ${score} / ${quizData.length}`;
            nextBtn.style.display = "none";
        }
    });

    /* ========================
       RESET QUIZ
    ======================== */
    resetBtn.addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;
        nextBtn.style.display = "inline-block";
        quizData.sort(() => Math.random() - 0.5);
        loadQuestion();
    });

    loadQuestion();
});

/* ========================
   NAV ACTIVE ON SCROLL
======================== */
document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll(".nav-link");

    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});
