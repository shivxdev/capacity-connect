/* =========================================
   CAPACITY CONNECT - PROGRESS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------
       AUTH CHECK
    ----------------------------------------- */

    const isLoggedIn =
        localStorage.getItem("capacityConnectLoggedIn");

    const role =
        localStorage.getItem("capacityConnectRole");

    if (isLoggedIn !== "true" || role !== "trainee") {
        window.location.href = "../login.html";
        return;
    }


    /* -----------------------------------------
       USER DATA
    ----------------------------------------- */

    const storedUser =
    localStorage.getItem("capacityConnectUser");

const userName =
    localStorage.getItem("capacityConnectName") ||
    "Shivam Kumar";

    const userNameElement =
        document.getElementById("userName");

    const userAvatar =
        document.getElementById("userAvatar");

    if (userNameElement) {
        userNameElement.textContent = userName;
    }

    if (userAvatar) {
        userAvatar.textContent =
            userName.charAt(0).toUpperCase();
    }


    /* -----------------------------------------
       ASSESSMENT RESULT
    ----------------------------------------- */

    const savedScore =
        localStorage.getItem("capacityConnectAssessmentScore");

    const savedStatus =
        localStorage.getItem("capacityConnectAssessmentStatus");

    const latestScore =
        document.getElementById("latestScore");

    const resultStatus =
        document.getElementById("resultStatus");

    if (savedScore !== null) {

        latestScore.textContent =
            `${savedScore}%`;

        if (savedStatus === "passed") {

            resultStatus.textContent =
                "Passed";

            resultStatus.classList.add("passed");

        } else {

            resultStatus.textContent =
                "Needs Improvement";

            resultStatus.classList.add("failed");
        }

    } else {

        latestScore.textContent = "--";

        resultStatus.textContent =
            "Assessment not attempted";
    }


    /* -----------------------------------------
       ASSESSMENT COUNT
    ----------------------------------------- */

    const assessmentCount =
        document.getElementById("assessmentCount");

    if (assessmentCount) {

        assessmentCount.textContent =
            savedScore !== null ? "1" : "0";
    }


    /* -----------------------------------------
       MOBILE SIDEBAR
    ----------------------------------------- */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");

    if (mobileMenu && sidebar) {

        mobileMenu.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });
    }


    /* -----------------------------------------
       LOGOUT
    ----------------------------------------- */

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            localStorage.removeItem(
                "capacityConnectLoggedIn"
            );

            localStorage.removeItem(
                "capacityConnectRole"
            );

            localStorage.removeItem(
                "capacityConnectUser"
            );

            window.location.href =
                "../login.html";
        });
    }


    /* -----------------------------------------
       ANIMATE PROGRESS BARS
    ----------------------------------------- */

    const progressBars =
        document.querySelectorAll(
            ".course-progress-bar span, .mini-progress span"
        );

    progressBars.forEach((bar) => {

        const finalWidth =
            bar.style.width;

        bar.style.width = "0";

        setTimeout(() => {

            bar.style.width = finalWidth;

        }, 250);
    });

});