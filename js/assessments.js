/* =========================================
   CAPACITY CONNECT
   MCQ ASSESSMENT JS
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       LOGIN CHECK
    ===================================== */

    const isLoggedIn =
        localStorage.getItem("capacityConnectLoggedIn");

    const role =
        localStorage.getItem("capacityConnectRole");


    if (
        isLoggedIn !== "true" ||
        role !== "trainee"
    ) {

        window.location.href = "../login.html";

        return;

    }


    /* =====================================
       USER
    ===================================== */

    let userName =
        localStorage.getItem("capacityConnectUser")
        || "Shivam Kumar";


    if (
        userName.includes("@") ||
        /^[0-9]+$/.test(userName)
    ) {

        userName = "Shivam Kumar";

    }


    document.getElementById(
        "sidebarUserName"
    ).textContent = userName;


    document.getElementById(
        "headerUserName"
    ).textContent = userName;


    /* =====================================
       QUESTIONS
    ===================================== */

    const questions = [

        {
            topic: "Forecasting Basics",

            question:
                "What is the primary purpose of weather forecasting?",

            options: [
                "To understand and predict future atmospheric conditions",
                "To measure only historical rainfall",
                "To record temperature once a month",
                "To replace weather observation systems"
            ],

            answer: 0
        },


        {
            topic: "Weather Data",

            question:
                "Which information is commonly used while preparing a weather forecast?",

            options: [
                "Meteorological observations and atmospheric data",
                "Only population statistics",
                "Only historical photographs",
                "Only road traffic data"
            ],

            answer: 0
        },


        {
            topic: "Atmospheric Conditions",

            question:
                "Which factor is important when analysing atmospheric conditions?",

            options: [
                "Temperature",
                "Building colour",
                "Road width",
                "Vehicle registration"
            ],

            answer: 0
        },


        {
            topic: "Forecasting Methods",

            question:
                "Numerical weather prediction primarily uses what to forecast atmospheric conditions?",

            options: [
                "Mathematical models and atmospheric observations",
                "Manual attendance records",
                "Social media comments only",
                "Population surveys"
            ],

            answer: 0
        },


        {
            topic: "Observation",

            question:
                "Why are accurate weather observations important?",

            options: [
                "They provide reliable data for analysis and forecasting",
                "They eliminate the need for any forecast",
                "They are used only for administrative records",
                "They are unrelated to forecasting"
            ],

            answer: 0
        },


        {
            topic: "Meteorological Data",

            question:
                "What does meteorological data generally describe?",

            options: [
                "Observed atmospheric conditions",
                "Financial transactions",
                "Educational attendance only",
                "Transport schedules"
            ],

            answer: 0
        },


        {
            topic: "Forecast Interpretation",

            question:
                "What should a trainee consider when interpreting a forecast?",

            options: [
                "Forecast information, time period and relevant observations",
                "Only the colour of the forecast chart",
                "Only the location name",
                "Only the publication date"
            ],

            answer: 0
        },


        {
            topic: "Technical Competency",

            question:
                "Which skill supports effective interpretation of meteorological information?",

            options: [
                "Data analysis and observation skills",
                "Graphic design only",
                "Typing speed only",
                "Public speaking only"
            ],

            answer: 0
        },


        {
            topic: "Forecast Communication",

            question:
                "Why is clear communication of forecast information important?",

            options: [
                "It helps users understand expected weather conditions",
                "It removes the need for observations",
                "It guarantees every forecast is correct",
                "It replaces technical analysis"
            ],

            answer: 0
        },


        {
            topic: "Competency Check",

            question:
                "What is the main objective of this assessment?",

            options: [
                "Evaluate understanding of the training module",
                "Register a new trainee",
                "Create a training course",
                "Manage trainer accounts"
            ],

            answer: 0
        }

    ];


    /* =====================================
       STATE
    ===================================== */

    let currentQuestion = 0;

    let selectedAnswers =
        new Array(questions.length).fill(null);

    let submitted = false;


    /* =====================================
       TIMER
    ===================================== */

    const totalTime = 15 * 60;

    let remainingTime = totalTime;

    let timerInterval;


    const timer =
        document.getElementById("timer");

    const timerBar =
        document.getElementById("timerBar");


    function updateTimer() {

        const minutes =
            Math.floor(remainingTime / 60);

        const seconds =
            remainingTime % 60;


        timer.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


        const percentage =
            (remainingTime / totalTime) * 100;


        timerBar.style.width =
            percentage + "%";


        if (remainingTime <= 300) {

            timer.classList.add("warning");

        }


        if (remainingTime <= 60) {

            timer.classList.remove("warning");

            timer.classList.add("danger");

        }


        if (remainingTime <= 0) {

            clearInterval(timerInterval);

            submitAssessment(true);

            return;

        }


        remainingTime--;

    }


    updateTimer();


    timerInterval =
        setInterval(updateTimer, 1000);


    /* =====================================
       RENDER QUESTION
    ===================================== */

    const questionNumber =
        document.getElementById("questionNumber");

    const questionText =
        document.getElementById("questionText");

    const optionsContainer =
        document.getElementById("optionsContainer");

    const questionProgress =
        document.getElementById("questionProgress");

    const previousBtn =
        document.getElementById("previousBtn");

    const nextBtn =
        document.getElementById("nextBtn");


    function renderQuestion() {

        const question =
            questions[currentQuestion];


        questionNumber.textContent =
            currentQuestion + 1;


        questionText.textContent =
            question.question;


        questionProgress.textContent =
            `${currentQuestion + 1} / ${questions.length}`;


        optionsContainer.innerHTML = "";


        question.options.forEach(
            function (optionText, index) {

                const button =
                    document.createElement("button");


                button.className = "option";


                if (
                    selectedAnswers[currentQuestion]
                    === index
                ) {

                    button.classList.add(
                        "selected"
                    );

                }


                button.innerHTML = `

                    <span class="option-letter">
                        ${String.fromCharCode(65 + index)}
                    </span>

                    <span class="option-text">
                        ${optionText}
                    </span>

                `;


                button.addEventListener(
                    "click",
                    function () {

                        selectedAnswers[
                            currentQuestion
                        ] = index;


                        renderQuestion();

                        updateQuestionMap();

                    }
                );


                optionsContainer.appendChild(
                    button
                );

            }
        );


        previousBtn.disabled =
            currentQuestion === 0;


        if (
            currentQuestion ===
            questions.length - 1
        ) {

            nextBtn.textContent =
                "Review →";

        } else {

            nextBtn.textContent =
                "Next →";

        }

    }


    /* =====================================
       QUESTION MAP
    ===================================== */

    const questionNumbers =
        document.getElementById(
            "questionNumbers"
        );

    const answeredCount =
        document.getElementById(
            "answeredCount"
        );


    function updateQuestionMap() {

        questionNumbers.innerHTML = "";


        questions.forEach(
            function (_, index) {

                const button =
                    document.createElement("button");


                button.className =
                    "question-number";


                button.textContent =
                    index + 1;


                if (
                    index === currentQuestion
                ) {

                    button.classList.add(
                        "current"
                    );

                }


                if (
                    selectedAnswers[index] !== null
                ) {

                    button.classList.add(
                        "answered"
                    );

                }


                button.addEventListener(
                    "click",
                    function () {

                        currentQuestion = index;

                        renderQuestion();

                        updateQuestionMap();

                    }
                );


                questionNumbers.appendChild(
                    button
                );

            }
        );


        const answered =
            selectedAnswers.filter(
                answer => answer !== null
            ).length;


        answeredCount.textContent =
            `${answered} / ${questions.length} answered`;

    }


    /* =====================================
       NEXT
    ===================================== */

    nextBtn.addEventListener(
        "click",
        function () {

            if (
                currentQuestion <
                questions.length - 1
            ) {

                currentQuestion++;

                renderQuestion();

                updateQuestionMap();

            } else {

                const unanswered =
                    selectedAnswers.filter(
                        answer => answer === null
                    ).length;


                if (unanswered > 0) {

                    alert(
                        `You still have ${unanswered} unanswered question(s).`
                    );

                    return;

                }


                submitAssessment(false);

            }

        }
    );


    /* =====================================
       PREVIOUS
    ===================================== */

    previousBtn.addEventListener(
        "click",
        function () {

            if (currentQuestion > 0) {

                currentQuestion--;

                renderQuestion();

                updateQuestionMap();

            }

        }
    );


    /* =====================================
       SUBMIT
    ===================================== */

    const submitBtn =
        document.getElementById("submitBtn");


    submitBtn.addEventListener(
        "click",
        function () {

            const unanswered =
                selectedAnswers.filter(
                    answer => answer === null
                ).length;


            if (unanswered > 0) {

                const confirmSubmit =
                    confirm(
                        `You have ${unanswered} unanswered question(s). Do you want to submit anyway?`
                    );


                if (!confirmSubmit) {
                    return;
                }

            }


            submitAssessment(false);

        }
    );


    /* =====================================
       RESULT
    ===================================== */

    const resultOverlay =
        document.getElementById(
            "resultOverlay"
        );

    const resultIcon =
        document.getElementById(
            "resultIcon"
        );

    const resultTitle =
        document.getElementById(
            "resultTitle"
        );

    const resultDescription =
        document.getElementById(
            "resultDescription"
        );

    const scoreValue =
        document.getElementById(
            "scoreValue"
        );

    const correctCount =
        document.getElementById(
            "correctCount"
        );

    const wrongCount =
        document.getElementById(
            "wrongCount"
        );

    const resultStatus =
        document.getElementById(
            "resultStatus"
        );


    function submitAssessment(autoSubmit) {

        if (submitted) {
            return;
        }


        submitted = true;


        clearInterval(timerInterval);


        let correct = 0;


        questions.forEach(
            function (question, index) {

                if (
                    selectedAnswers[index]
                    === question.answer
                ) {

                    correct++;

                }

            }
        );


        const wrong =
            questions.length - correct;


        const score =
            Math.round(
                (correct / questions.length) * 100
            );


        const passed =
            score >= 70;


        localStorage.setItem(
            "capacityConnectAssessmentScore",
            score
        );

        localStorage.setItem(
            "capacityConnectAssessmentStatus",
            passed ? "Passed" : "Needs Improvement"
        );


        scoreValue.textContent =
            score + "%";


        correctCount.textContent =
            correct;


        wrongCount.textContent =
            wrong;


        resultStatus.textContent =
            passed ? "Passed" : "Review";


        if (passed) {

            resultIcon.textContent = "✓";

            resultIcon.classList.remove(
                "failed"
            );

            resultTitle.textContent =
                "Assessment Passed";

            resultDescription.textContent =
                autoSubmit
                    ? "Time ended. Your submitted answers have been evaluated."
                    : "Well done! You have successfully completed this assessment.";

        } else {

            resultIcon.textContent = "!";

            resultIcon.classList.add(
                "failed"
            );

            resultTitle.textContent =
                "Assessment Needs Review";

            resultDescription.textContent =
                "Review the learning resources and try the assessment again.";

        }


        resultOverlay.classList.add(
            "show"
        );

    }


    /* =====================================
       CONTINUE
    ===================================== */

    const continueBtn =
        document.getElementById(
            "continueBtn"
        );


    continueBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "progress.html";

        }
    );


    /* =====================================
       RETRY
    ===================================== */

    const retryBtn =
        document.getElementById(
            "retryBtn"
        );


    retryBtn.addEventListener(
        "click",
        function () {

            location.reload();

        }
    );


    /* =====================================
       MOBILE MENU
    ===================================== */

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );

    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (mobileMenu && sidebar) {

        mobileMenu.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle(
                    "open"
                );

            }
        );

    }


    /* =====================================
       LOGOUT
    ===================================== */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    logoutBtn.addEventListener(
        "click",
        function () {

            if (
                !confirm(
                    "Are you sure you want to logout?"
                )
            ) {

                return;

            }


            localStorage.removeItem(
                "capacityConnectLoggedIn"
            );

            localStorage.removeItem(
                "capacityConnectRole"
            );

            localStorage.removeItem(
                "capacityConnectUser"
            );

            localStorage.removeItem(
                "capacityConnectRemember"
            );


            window.location.href =
                "../login.html";

        }
    );


    /* =====================================
       INITIAL LOAD
    ===================================== */

    renderQuestion();

    updateQuestionMap();

});