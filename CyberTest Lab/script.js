const quizPool = [
    {
      question: "Nmap ne işe yarar?",
      options: ["Ağ taraması", "Şifre kırma", "Virüs tespiti", "Dosya kurtarma"],
      answer: "Ağ taraması",
      level: "easy"
    },
    {
      question: "Base64 kodu 'YWRtaW4=' neyi ifade eder?",
      options: ["admin", "root", "password", "user"],
      answer: "admin",
      level: "medium"
    },
    {
      question: "XSS saldırısında temel amaç nedir?",
      options: [
        "Kullanıcı bilgilerini ele geçirmek",
        "Sistemi çökertmek",
        "Sunucuyu yeniden başlatmak",
        "Veritabanını silmek"
      ],
      answer: "Kullanıcı bilgilerini ele geçirmek",
      level: "hard"
    },
    {
      question: "Bir kullanıcı 'whoami' komutunu neden kullanır?",
      options: [
        "Çalışan işlemleri listeler",
        "Kendi kullanıcı adını öğrenmek için",
        "Disk alanını görüntüler",
        "IP adresini öğrenmek için"
      ],
      answer: "Kendi kullanıcı adını öğrenmek için",
      level: "easy"
    },
    {
      question: "‘nmap -sS 192.168.1.1’ komutu ne yapar?",
      options: [
        "TCP SYN taraması yapar",
        "Tüm ağ trafiğini kaydeder",
        "Şifreli bağlantı kurar",
        "DNS sorgusu gönderir"
      ],
      answer: "TCP SYN taraması yapar",
      level: "medium"
    }
  ];
  
  let filteredQuiz = [];
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz(difficulty) {
    filteredQuiz = quizPool.filter(q => q.level === difficulty);
    shuffleArray(filteredQuiz);
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("difficulty-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";
    showQuestion();
  }
  
  function showQuestion() {
    const currentQuestion = filteredQuiz[currentQuestionIndex];
    document.getElementById("question").innerText = currentQuestion.question;
  
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
  
    currentQuestion.options.forEach(option => {
      const btn = document.createElement("button");
      btn.innerText = option;
      btn.onclick = () => checkAnswer(btn, currentQuestion.answer);
      optionsContainer.appendChild(btn);
    });
  
    document.getElementById("next-btn").style.display = "none";
  }
  
  function checkAnswer(button, correctAnswer) {
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach(btn => btn.disabled = true);
  
    if (button.innerText === correctAnswer) {
      button.classList.add("correct");
      score++;
    } else {
      button.classList.add("wrong");
      buttons.forEach(btn => {
        if (btn.innerText === correctAnswer) {
          btn.classList.add("correct");
        }
      });
    }
  
    if (currentQuestionIndex < filteredQuiz.length - 1) {
      const nextBtn = document.getElementById("next-btn");
      nextBtn.style.display = "inline-block";
      nextBtn.onclick = () => {
        currentQuestionIndex++;
        showQuestion();
      };
    } else {
      // Quiz bittiğinde sonucu göster
      setTimeout(showResult, 600);
    }
  }
  
  function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    const resultContainer = document.getElementById("result-container");
    resultContainer.style.display = "block";
  
    const scoreText = document.getElementById("score");
    scoreText.innerText = `Skorunuz: ${score} / ${filteredQuiz.length}`;
  
    // Geri dön butonu
    if (!document.getElementById("back-btn")) {
      const backBtn = document.createElement("button");
      backBtn.id = "back-btn";
      backBtn.innerText = "Tekrar Seviye Seç";
      backBtn.onclick = () => {
        resultContainer.style.display = "none";
        document.getElementById("difficulty-container").style.display = "flex";
      };
      resultContainer.appendChild(backBtn);
    }
  }
  
  // Fisher-Yates shuffle algoritması
  function shuffleArray(array) {
    for (let i = array.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }