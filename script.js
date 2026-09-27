/**
 * Interactive Online Quiz Application – Web Technology
 * Frontend-Only Vanilla JavaScript
 * College Assignment
 */

// Strict Mode for quality and safety
"use strict";

/* ==========================================================================
   1. QUIZ DATA (10 Web Technology Multiple Choice Questions)
   ========================================================================== */
const quizQuestions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language"
    ],
    correctAnswer: 0, // A
    explanation: "HTML stands for Hyper Text Markup Language, the standard markup language used for creating web pages."
  },
  {
    id: 2,
    question: "Which HTML tag is used to create a hyperlink?",
    options: [
      "<link>",
      "<a>",
      "<href>",
      "<url>"
    ],
    correctAnswer: 1, // B
    explanation: "The <a> (anchor) tag is used in HTML with the 'href' attribute to define hyperlinks."
  },
  {
    id: 3,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    correctAnswer: 2, // C
    explanation: "CSS stands for Cascading Style Sheets, used for styling the layout and presentation of web pages."
  },
  {
    id: 4,
    question: "Which CSS property is used to change the text color?",
    options: [
      "font-color",
      "text-color",
      "color",
      "foreground"
    ],
    correctAnswer: 2, // C
    explanation: "The 'color' property in CSS specifies the foreground color of text content."
  },
  {
    id: 5,
    question: "Which language is mainly used to add interactivity to web pages?",
    options: [
      "HTML",
      "CSS",
      "JavaScript",
      "SQL"
    ],
    correctAnswer: 2, // C
    explanation: "JavaScript is the primary client-side programming language used to add interactive behavior to web pages."
  },
  {
    id: 6,
    question: "Which HTML element is used to insert an image?",
    options: [
      "<image>",
      "<img>",
      "<picture>",
      "<src>"
    ],
    correctAnswer: 1, // B
    explanation: "The <img> tag embeds images in an HTML document and requires the 'src' and 'alt' attributes."
  },
  {
    id: 7,
    question: "What does HTTP stand for?",
    options: [
      "HyperText Transfer Protocol",
      "High Transfer Text Protocol",
      "Hyperlink Transfer Technology Protocol",
      "HyperText Transmission Program"
    ],
    correctAnswer: 0, // A
    explanation: "HTTP stands for HyperText Transfer Protocol, the foundational protocol used for transmitting web resources across the Internet."
  },
  {
    id: 8,
    question: "Which HTML element is used to create a form?",
    options: [
      "<input>",
      "<form>",
      "<fieldset>",
      "<submit>"
    ],
    correctAnswer: 1, // B
    explanation: "The <form> element is used to create an interactive HTML form for user input collection."
  },
  {
    id: 9,
    question: "What is responsive web design?",
    options: [
      "Designing websites only for computers",
      "Designing websites that adapt to different screen sizes",
      "Designing websites without CSS",
      "Designing websites only for mobile phones"
    ],
    correctAnswer: 1, // B
    explanation: "Responsive web design is an approach allowing web pages to adapt dynamically to various screen sizes and viewports (mobile, tablet, desktop)."
  },
  {
    id: 10,
    question: "Which JavaScript method is commonly used to select an HTML element by its ID?",
    options: [
      "getElementById()",
      "selectById()",
      "getElement()",
      "findElement()"
    ],
    correctAnswer: 0, // A
    explanation: "document.getElementById() is the standard DOM method used to access a single element by its unique 'id' attribute."
  }
];

/* ==========================================================================
   2. STATE MANAGEMENT
   ========================================================================== */
const totalQuestions = quizQuestions.length;
let currentQuestionIndex = 0;
// Array to store user's selected option index (0-3) for each question, or null if unanswered
let userAnswers = new Array(totalQuestions).fill(null);

/* ==========================================================================
   3. DOM ELEMENT REFERENCES
   ========================================================================== */
// Screens
const homeScreen = document.getElementById("home-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

// Buttons
const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const toggleReviewBtn = document.getElementById("toggle-review-btn");

// Quiz UI Elements
const questionCounter = document.getElementById("question-counter");
const liveScore = document.getElementById("live-score");
const progressBar = document.getElementById("progress-bar");
const progressBarContainer = document.getElementById("progress-bar-container");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackAlert = document.getElementById("feedback-alert");

// Result UI Elements
const performanceMessage = document.getElementById("performance-message");
const finalPercentage = document.getElementById("final-percentage");
const finalPercentageText = document.getElementById("final-percentage-text");
const finalScore = document.getElementById("final-score");
const correctCount = document.getElementById("correct-count");
const incorrectCount = document.getElementById("incorrect-count");
const reviewSection = document.getElementById("review-section");
const reviewList = document.getElementById("review-list");

/* ==========================================================================
   4. SVG ICONS REUSABLE HELPER
   ========================================================================== */
const ICONS = {
  check: `
    <svg class="status-icon correct-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>`,
  cross: `
    <svg class="status-icon incorrect-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`,
  alertCheck: `
    <svg class="feedback-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>`,
  alertCross: `
    <svg class="feedback-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>`
};

/* ==========================================================================
   5. CORE FUNCTIONS
   ========================================================================== */

/**
 * Switch view between screens safely
 * @param {string} screenId - ID of screen to show ('home-screen', 'quiz-screen', 'result-screen')
 */
function showScreen(screenId) {
  const screens = [homeScreen, quizScreen, resultScreen];
  screens.forEach((screen) => {
    if (screen.id === screenId) {
      screen.style.display = "block";
      screen.classList.add("active");
    } else {
      screen.style.display = "none";
      screen.classList.remove("active");
    }
  });

  // Scroll to top of the card smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Calculates current score achieved so far
 * @returns {number} Count of correctly answered questions
 */
function calculateCurrentScore() {
  let score = 0;
  userAnswers.forEach((answerIndex, qIndex) => {
    if (answerIndex !== null && answerIndex === quizQuestions[qIndex].correctAnswer) {
      score++;
    }
  });
  return score;
}

/**
 * Initializes and begins the quiz from question 1
 */
function startQuiz() {
  currentQuestionIndex = 0;
  userAnswers = new Array(totalQuestions).fill(null);
  showScreen("quiz-screen");
  renderQuestion();
}

/**
 * Renders the question corresponding to currentQuestionIndex
 */
function renderQuestion() {
  const qData = quizQuestions[currentQuestionIndex];
  const isAnswered = userAnswers[currentQuestionIndex] !== null;
  const userAnswer = userAnswers[currentQuestionIndex];

  // Update Meta Header
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
  liveScore.textContent = `${calculateCurrentScore()} / ${totalQuestions}`;

  // Update Progress Bar
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
  progressBar.style.width = `${progressPercent}%`;
  progressBarContainer.setAttribute("aria-valuenow", progressPercent);

  // Set Question Text
  questionText.textContent = `${currentQuestionIndex + 1}. ${qData.question}`;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Prefixes A, B, C, D
  const optionLetters = ["A", "B", "C", "D"];

  // Populate options
  qData.options.forEach((optText, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", userAnswer === index ? "true" : "false");

    // Option Prefix (A, B, C, D)
    const prefixSpan = document.createElement("span");
    prefixSpan.className = "option-prefix";
    prefixSpan.textContent = optionLetters[index];

    // Option Text (using textContent to safely handle tags like <a>, <img>)
    const textSpan = document.createElement("span");
    textSpan.className = "option-text";
    textSpan.textContent = optText;

    btn.appendChild(prefixSpan);
    btn.appendChild(textSpan);

    // Append check and cross icons for feedback display
    btn.insertAdjacentHTML("beforeend", ICONS.check);
    btn.insertAdjacentHTML("beforeend", ICONS.cross);

    // If this question has already been answered previously, restore visual state
    if (isAnswered) {
      btn.disabled = true; // Lock question

      if (index === qData.correctAnswer) {
        if (userAnswer === index) {
          btn.classList.add("correct");
        } else {
          // Reveal correct answer if user chose wrong
          btn.classList.add("revealed-correct");
        }
      } else if (userAnswer === index) {
        btn.classList.add("incorrect");
      }
    } else {
      // Attach click listener for answering
      btn.addEventListener("click", () => handleOptionSelection(index));
    }

    optionsContainer.appendChild(btn);
  });

  // Render or clear feedback banner
  if (isAnswered) {
    displayFeedbackBanner(userAnswer === qData.correctAnswer, qData.correctAnswer);
  } else {
    feedbackAlert.style.display = "none";
    feedbackAlert.className = "feedback-alert";
    feedbackAlert.innerHTML = "";
  }

  // Update Navigation Controls
  updateNavButtons(isAnswered);
}

/**
 * Displays instant feedback message when an option is selected
 * @param {boolean} isCorrect - Did user choose the right answer?
 * @param {number} correctIndex - Index of the correct answer
 */
function displayFeedbackBanner(isCorrect, correctIndex) {
  const correctLetter = ["A", "B", "C", "D"][correctIndex];
  const correctText = quizQuestions[currentQuestionIndex].options[correctIndex];

  feedbackAlert.style.display = "flex";

  if (isCorrect) {
    feedbackAlert.className = "feedback-alert feedback-correct";
    feedbackAlert.innerHTML = `${ICONS.alertCheck} <span><strong>Correct!</strong> Well done.</span>`;
  } else {
    feedbackAlert.className = "feedback-alert feedback-incorrect";
    feedbackAlert.innerHTML = `${ICONS.alertCross} <span><strong>Incorrect!</strong> The correct answer is <strong>${correctLetter}. ${escapeHtml(correctText)}</strong></span>`;
  }
}

/**
 * Handles option selection event
 * @param {number} selectedIndex - The option index clicked (0-3)
 */
function handleOptionSelection(selectedIndex) {
  // Prevent duplicate selection if already answered
  if (userAnswers[currentQuestionIndex] !== null) return;

  // Store user's selected choice
  userAnswers[currentQuestionIndex] = selectedIndex;

  const qData = quizQuestions[currentQuestionIndex];
  const isCorrect = selectedIndex === qData.correctAnswer;
  const optionButtons = optionsContainer.querySelectorAll(".option-btn");

  // Disable all options and apply feedback classes
  optionButtons.forEach((btn, index) => {
    btn.disabled = true; // Lock question

    if (index === qData.correctAnswer) {
      if (selectedIndex === index) {
        btn.classList.add("correct");
        btn.setAttribute("aria-checked", "true");
      } else {
        btn.classList.add("revealed-correct");
      }
    } else if (selectedIndex === index) {
      btn.classList.add("incorrect");
      btn.setAttribute("aria-checked", "true");
    }
  });

  // Show immediate feedback message
  displayFeedbackBanner(isCorrect, qData.correctAnswer);

  // Update live score
  liveScore.textContent = `${calculateCurrentScore()} / ${totalQuestions}`;

  // Enable Next / Submit button
  updateNavButtons(true);
}

/**
 * Updates button states (Previous, Next, Submit Quiz)
 * @param {boolean} isAnswered - Has current question been answered?
 */
function updateNavButtons(isAnswered) {
  // Previous button: disabled on first question
  prevBtn.disabled = currentQuestionIndex === 0;

  const isFinalQuestion = currentQuestionIndex === totalQuestions - 1;

  if (isFinalQuestion) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-flex";
    submitBtn.disabled = !isAnswered;
  } else {
    nextBtn.style.display = "inline-flex";
    submitBtn.style.display = "none";
    nextBtn.disabled = !isAnswered;
  }
}

/**
 * Moves to previous question
 */
function handlePrevious() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

/**
 * Moves to next question
 */
function handleNext() {
  if (currentQuestionIndex < totalQuestions - 1) {
    // Check if answered
    if (userAnswers[currentQuestionIndex] === null) {
      alert("Please select an answer before continuing to the next question.");
      return;
    }
    currentQuestionIndex++;
    renderQuestion();
  }
}

/**
 * Submits the quiz and calculates final results
 */
function handleSubmit() {
  // Check if final question is answered
  if (userAnswers[currentQuestionIndex] === null) {
    alert("Please select an answer for Question 10 before submitting.");
    return;
  }

  const score = calculateCurrentScore();
  const percentage = Math.round((score / totalQuestions) * 100);
  const incorrectCountNum = totalQuestions - score;

  // Set Results on UI
  finalScore.textContent = `${score} / ${totalQuestions}`;
  finalPercentage.textContent = `${percentage}%`;
  finalPercentageText.textContent = `${percentage}%`;
  correctCount.textContent = score;
  incorrectCount.textContent = incorrectCountNum;

  // Determine Performance Message
  let message = "";
  if (percentage === 100) {
    message = "Outstanding! Perfect Score! You have mastered the fundamentals of Web Technology.";
  } else if (percentage >= 80) {
    message = "Excellent Job! You have a solid grasp of HTML, CSS, and JavaScript concepts.";
  } else if (percentage >= 60) {
    message = "Good Work! You have good foundational knowledge. Keep practicing to reach the top.";
  } else if (percentage >= 40) {
    message = "Fair Attempt! Review your core concepts of HTML, CSS, and JavaScript and try again.";
  } else {
    message = "Keep Practicing! Review Web Technology basics and take the quiz again to improve your score.";
  }
  performanceMessage.textContent = message;

  // Render Answer Review Section
  renderReviewList();

  // Show Result Screen
  showScreen("result-screen");
}

/**
 * Renders the question review list in results
 */
function renderReviewList() {
  reviewList.innerHTML = "";
  const optionLetters = ["A", "B", "C", "D"];

  quizQuestions.forEach((q, idx) => {
    const userChoice = userAnswers[idx];
    const isCorrect = userChoice === q.correctAnswer;
    const isUnanswered = userChoice === null;

    const item = document.createElement("div");
    let statusClass = isUnanswered ? "item-unanswered" : isCorrect ? "item-correct" : "item-incorrect";
    item.className = `review-item ${statusClass}`;

    const userAnsText = isUnanswered
      ? "Not answered"
      : `${optionLetters[userChoice]}. ${q.options[userChoice]}`;

    const correctAnsText = `${optionLetters[q.correctAnswer]}. ${q.options[q.correctAnswer]}`;

    item.innerHTML = `
      <div class="review-q-title">${idx + 1}. ${escapeHtml(q.question)}</div>
      <div class="review-meta">
        <div class="review-user-ans ${isCorrect ? 'ans-correct' : 'ans-incorrect'}">
          Your Answer: <span>${escapeHtml(userAnsText)}</span>
          ${isCorrect ? "✓ (Correct)" : isUnanswered ? "(Skipped)" : "✗ (Incorrect)"}
        </div>
        ${
          !isCorrect
            ? `<div class="review-correct-ans">Correct Answer: <strong>${escapeHtml(correctAnsText)}</strong></div>`
            : ""
        }
        <div class="review-explanation" style="font-size: 0.82rem; color: #64748b; margin-top: 4px;">
          <em>Note:</em> ${escapeHtml(q.explanation)}
        </div>
      </div>
    `;

    reviewList.appendChild(item);
  });
}

/**
 * Toggles the detailed review section on the results screen
 */
function toggleReview() {
  const isHidden = reviewSection.style.display === "none";
  if (isHidden) {
    reviewSection.style.display = "block";
    toggleReviewBtn.querySelector("span").textContent = "Hide Answer Key & Review";
    reviewSection.scrollIntoView({ behavior: "smooth" });
  } else {
    reviewSection.style.display = "none";
    toggleReviewBtn.querySelector("span").textContent = "View Answer Key & Review";
  }
}

/**
 * Restarts the quiz from the beginning, clearing all answers and score
 */
function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = new Array(totalQuestions).fill(null);
  reviewSection.style.display = "none";
  toggleReviewBtn.querySelector("span").textContent = "View Answer Key & Review";
  showScreen("quiz-screen");
  renderQuestion();
}

/**
 * Helper to escape HTML characters in strings for safe rendering
 * @param {string} str 
 * @returns {string} Safe escaped string
 */
function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ==========================================================================
   6. EVENT LISTENERS
   ========================================================================== */
startBtn.addEventListener("click", startQuiz);
prevBtn.addEventListener("click", handlePrevious);
nextBtn.addEventListener("click", handleNext);
submitBtn.addEventListener("click", handleSubmit);
restartBtn.addEventListener("click", restartQuiz);
toggleReviewBtn.addEventListener("click", toggleReview);

// Keyboard navigation support (Arrow keys for Next/Prev, 1-4 for options)
document.addEventListener("keydown", (e) => {
  if (quizScreen.style.display === "block") {
    if (e.key === "ArrowRight" && !nextBtn.disabled && nextBtn.style.display !== "none") {
      handleNext();
    } else if (e.key === "ArrowLeft" && !prevBtn.disabled) {
      handlePrevious();
    } else if (["1", "2", "3", "4"].includes(e.key)) {
      const optionIndex = parseInt(e.key, 10) - 1;
      const optionButtons = optionsContainer.querySelectorAll(".option-btn");
      if (optionButtons[optionIndex] && !optionButtons[optionIndex].disabled) {
        handleOptionSelection(optionIndex);
      }
    }
  }
});

/* ==========================================================================
   7. INITIALIZATION & TEST STATE HANDLER
   ========================================================================== */
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const testMode = urlParams.get("test");

  if (testMode === "quiz") {
    startQuiz();
  } else if (testMode === "feedback") {
    startQuiz();
    handleOptionSelection(0); // Q1 correct (A)
  } else if (testMode === "wrong") {
    startQuiz();
    currentQuestionIndex = 1;
    renderQuestion();
    handleOptionSelection(0); // Q2 wrong (A selected, B is correct)
  } else if (testMode === "result") {
    startQuiz();
    userAnswers = [0, 0, 2, 2, 2, 1, 0, 1, 1, 0]; // 9 correct, 1 wrong (score: 9/10)
    currentQuestionIndex = 9;
    handleSubmit();
  } else if (testMode === "review") {
    startQuiz();
    userAnswers = [0, 0, 2, 2, 2, 1, 0, 1, 1, 0];
    currentQuestionIndex = 9;
    handleSubmit();
    toggleReview();
  }
});

