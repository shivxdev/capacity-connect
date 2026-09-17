/* =========================================
   CAPACITY CONNECT
   COURSE DETAILS JS
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
       MOBILE MENU
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
       ENROLLMENT
    ===================================== */

    const enrollBtn =
        document.getElementById("enrollBtn");

    const enrollMessage =
        document.getElementById("enrollMessage");


    const enrollmentKey =
        "weatherForecastingEnrolled";


    function updateEnrollmentUI() {

        const enrolled =
            localStorage.getItem(enrollmentKey)
            === "true";


        if (enrolled) {

            enrollBtn.textContent =
                "✓ Enrolled — Start Training";

            enrollBtn.classList.add("enrolled");

            enrollMessage.textContent =
                "You are enrolled in this training programme.";

        } else {

            enrollBtn.textContent =
                "Enroll in Training";

            enrollBtn.classList.remove("enrolled");

            enrollMessage.textContent = "";

        }

    }


    updateEnrollmentUI();


    if (enrollBtn) {

        enrollBtn.addEventListener(
            "click",
            function () {

                const enrolled =
                    localStorage.getItem(enrollmentKey)
                    === "true";


                if (enrolled) {

                    window.location.href =
                        "learning.html";

                    return;

                }


                localStorage.setItem(
                    enrollmentKey,
                    "true"
                );


                enrollBtn.textContent =
                    "✓ Enrolled — Start Training";

                enrollBtn.classList.add("enrolled");


                enrollMessage.textContent =
                    "Successfully enrolled! Your training is now available.";

            }
        );

    }


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