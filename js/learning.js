/* =========================================
   CAPACITY CONNECT
   LEARNING PAGE JS
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
       USER DATA
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


    const sidebarUserName =
        document.getElementById("sidebarUserName");

    const headerUserName =
        document.getElementById("headerUserName");


    if (sidebarUserName) {
        sidebarUserName.textContent = userName;
    }

    if (headerUserName) {
        headerUserName.textContent = userName;
    }


    /* =====================================
       MOBILE SIDEBAR
    ===================================== */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");


    if (mobileMenu && sidebar) {

        mobileMenu.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle("open");

            }
        );

    }


    /* =====================================
       LECTURE PLAY BUTTON
    ===================================== */

    const playLecture =
        document.getElementById("playLecture");


    if (playLecture) {

        playLecture.addEventListener(
            "click",
            function () {

                alert(
                    "Recorded Lecture player will be connected here."
                );

            }
        );

    }


    /* =====================================
       COMPLETE LECTURE
    ===================================== */

    const completeLecture =
        document.getElementById("completeLecture");

    const lectureMessage =
        document.getElementById("lectureMessage");


    if (completeLecture) {

        completeLecture.addEventListener(
            "click",
            function () {

                const alreadyCompleted =
                    localStorage.getItem(
                        "weatherForecastingModule4"
                    ) === "true";


                if (alreadyCompleted) {

                    return;

                }


                localStorage.setItem(
                    "weatherForecastingModule4",
                    "true"
                );


                completeLecture.textContent =
                    "✓ Module Completed";

                completeLecture.classList.add(
                    "completed"
                );


                lectureMessage.textContent =
                    "Great! Module 04 has been marked as completed.";

            }
        );


        if (
            localStorage.getItem(
                "weatherForecastingModule4"
            ) === "true"
        ) {

            completeLecture.textContent =
                "✓ Module Completed";

            completeLecture.classList.add(
                "completed"
            );

        }

    }


    /* =====================================
       RESOURCE BUTTONS
    ===================================== */

    const resourceButtons =
        document.querySelectorAll(".resource-btn");


    resourceButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const resourceName =
                        this.closest(
                            ".resource-item"
                        )
                        .querySelector(
                            ".resource-info strong"
                        )
                        .textContent
                        .trim();


                    alert(
                        resourceName +
                        "\n\nResource viewer will be connected here."
                    );

                }
            );

        }
    );


    /* =====================================
       MODULE BUTTONS
    ===================================== */

    const moduleButtons =
        document.querySelectorAll(
            ".learning-module"
        );


    moduleButtons.forEach(
        function (module) {

            module.addEventListener(
                "click",
                function () {

                    if (
                        this.classList.contains(
                            "locked"
                        )
                    ) {

                        alert(
                            "Complete the current training modules first."
                        );

                        return;

                    }


                    if (
                        this.classList.contains(
                            "current"
                        )
                    ) {

                        return;

                    }


                    alert(
                        "This module has already been completed."
                    );

                }
            );

        }
    );


    /* =====================================
       LOGOUT
    ===================================== */

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {
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

    }

});